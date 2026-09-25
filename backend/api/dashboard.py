from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from database.session import get_db
from database.models import Machine, Anomaly, Prediction, Recommendation, SensorReading, MaintenanceRecord

router = APIRouter()

@router.get("/summary")
def get_dashboard_summary(machine_id: int = 1, db: Session = Depends(get_db)):
    # Machine Stats
    total_machines = db.query(Machine).count()
    active_machines = db.query(Machine).filter(Machine.status == "Active").count()
    inactive_machines = total_machines - active_machines

    # Health Distribution
    healthy_count = total_machines - (active_machines // 4)  # mock logic based on total
    warning_count = active_machines // 5
    critical_count = total_machines - healthy_count - warning_count
    if critical_count < 0: critical_count = 0

    # Anomalies
    active_anomalies = db.query(Anomaly).filter(Anomaly.status == "Unresolved").count()

    # Predictions
    predicted_failures = db.query(Prediction).filter(Prediction.risk_level == "High").count()

    # Recent Alerts (using anomalies as alerts)
    recent_alerts = db.query(Anomaly).order_by(Anomaly.detected_at.desc()).limit(5).all()

    # Predictions List
    predicted_failures_list = db.query(Prediction, Machine).join(Machine).order_by(Prediction.failure_probability.desc()).limit(5).all()

    # Sensor Data (for selected machine)
    sensor_data = db.query(SensorReading).filter(SensorReading.machine_id == machine_id).order_by(SensorReading.timestamp.asc()).limit(24).all()

    # Recommended Actions
    actions = db.query(Recommendation).order_by(Recommendation.created_at.desc()).limit(4).all()

    # Maintenance Records (Calendar)
    calendar_records = db.query(MaintenanceRecord, Machine).join(Machine).order_by(MaintenanceRecord.maintenance_date.asc()).limit(4).all()

    # Anomalies by Equipment (for the bar chart)
    anomalies_group = db.query(Machine.machine_name, func.count(Anomaly.id).label("count")).join(Anomaly).group_by(Machine.machine_name).limit(5).all()
    colors = ["#3b82f6", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6"]

    return {
        "stats": {
            "total_machines": total_machines,
            "active_anomalies": active_anomalies,
            "predicted_failures": predicted_failures,
            "uptime_percentage": 98.6
        },
        "health_status": {
            "healthy": healthy_count,
            "warning": warning_count,
            "critical": critical_count,
            "offline": inactive_machines
        },
        "recent_alerts": [
            {
                "id": a.id,
                "message": a.anomaly_type + " - " + a.description,
                "time_ago": "Recently",
                "severity": "High" if a.anomaly_score > 0.8 else "Medium"
            } for a in recent_alerts
        ],
        "recommended_actions": [
            {
                "id": r.id,
                "title": r.recommendation,
                "description": f"Priority: {r.priority}",
                "actionLabel": "Schedule",
                "icon": "Wrench"
            } for r in actions
        ],
        "predicted_failures_list": [
            {
                "id": p.Prediction.id,
                "equipment": p.Machine.machine_name,
                "failureProbability": int(p.Prediction.failure_probability * 100),
                "predictedIn": "Soon",
                "risk": p.Prediction.risk_level
            } for p in predicted_failures_list
        ],
        "sensor_data": [
            {
                "time": s.timestamp.strftime("%H:%M"),
                "Vibration": round((s.rpm / 1500) * 15, 2),
                "Temperature": round(s.air_temperature, 2),
                "Pressure": round(s.torque, 2),
                "Flow Rate": round((s.power_consumption / 3000) * 50, 2)
            } for s in sensor_data
        ],
        "calendar_items": [
            {
                "id": c.MaintenanceRecord.id,
                "date": c.MaintenanceRecord.maintenance_date.strftime("%d %b"),
                "title": f"{c.Machine.machine_name} {c.MaintenanceRecord.description}",
                "status": c.MaintenanceRecord.status,
                "type": c.MaintenanceRecord.maintenance_type
            } for c in calendar_records
        ],
        "anomalies_by_equipment": [
            {
                "name": name,
                "count": count,
                "color": colors[i % len(colors)]
            } for i, (name, count) in enumerate(anomalies_group)
        ]
    }
