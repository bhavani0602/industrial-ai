from datetime import datetime, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from database.models import Anomaly, Machine, Prediction, SensorReading
from database.session import get_db

router = APIRouter()

# Rule-based severity per failure type (used for the Recent Alerts icons)
SEVERITY_BY_TYPE = {
    "Power Failure (PWF)": "critical",
    "Overstrain Failure (OSF)": "critical",
    "Heat Dissipation Failure (HDF)": "critical",
    "Tool Wear Failure (TWF)": "warning",
    "Random Failures (RNF)": "info",
}


def urgency_window(prob: float) -> str:
    """Rule-based urgency label derived from the model's probability (not a time forecast)."""
    if prob >= 0.9:
        return "Immediate"
    if prob >= 0.7:
        return "Within 2 days"
    if prob >= 0.5:
        return "Within 5 days"
    return "Within 7 days"


def spread(items, n):
    """Pick n items evenly spread across a list (so the list shows a range of risk levels)."""
    if len(items) <= n:
        return items
    step = (len(items) - 1) / (n - 1)
    return [items[round(i * step)] for i in range(n)]


@router.get("/summary")
def get_dashboard_summary(machine_id: int = 1, db: Session = Depends(get_db)):
    # ---- Machine stats ----------------------------------------------------
    total_machines = db.query(Machine).count()
    active_machines = db.query(Machine).filter(Machine.status == "Active").count()
    inactive_machines = total_machines - active_machines

    # ---- Health distribution (from the ML model's risk levels) -------------
    healthy_count = db.query(Prediction).filter(Prediction.risk_level == "Low").count()
    warning_count = db.query(Prediction).filter(Prediction.risk_level == "Medium").count()
    critical_count = db.query(Prediction).filter(Prediction.risk_level == "High").count()

    # ---- Anomalies / predictions -------------------------------------------
    active_anomalies = db.query(Anomaly).filter(Anomaly.status == "Unresolved").count()
    predicted_failures = critical_count

    # ---- AI predicted failures: a spread across Medium/High risk -----------
    risky = (
        db.query(Prediction, Machine)
        .join(Machine, Machine.id == Prediction.machine_id)
        .filter(Prediction.failure_probability >= 0.3)
        .order_by(Prediction.failure_probability.desc())
        .all()
    )
    picked = spread(risky, 5)

    # ---- Recent alerts: latest recorded failure of each failure type -------
    alert_rows = []
    types = [t[0] for t in db.query(Anomaly.anomaly_type).distinct().all()]
    for t in types:
        row = (
            db.query(Anomaly, Machine)
            .join(Machine, Machine.id == Anomaly.machine_id)
            .filter(Anomaly.anomaly_type == t)
            .order_by(Anomaly.detected_at.desc())
            .first()
        )
        if row:
            alert_rows.append(row)
    order = {"critical": 0, "warning": 1, "info": 2}
    alert_rows.sort(key=lambda r: order.get(SEVERITY_BY_TYPE.get(r.Anomaly.anomaly_type, "info"), 2))

    # ---- Sensor window: 24 consecutive readings ending at the selected machine
    anchor = db.query(SensorReading).filter(SensorReading.machine_id == machine_id).first()
    window = []
    if anchor:
        start_id = max(1, anchor.id - 12)  # selected machine sits in the middle of the window
        window = (
            db.query(SensorReading)
            .filter(SensorReading.id >= start_id, SensorReading.id <= start_id + 23)
            .order_by(SensorReading.timestamp.asc())
            .all()
        )

    machine_ids = [s.machine_id for s in window]
    probs = {}
    if machine_ids:
        probs = {
            p.machine_id: p.failure_probability
            for p in db.query(Prediction).filter(Prediction.machine_id.in_(machine_ids)).all()
        }

    # ---- Recommended actions + suggested maintenance (derived from predictions)
    actions = []
    for i, (p, m) in enumerate(picked[:3]):
        pct = int(p.failure_probability * 100)
        actions.append({
            "id": i + 1,
            "title": f"Inspect machine {m.machine_name} (failure risk {pct}%)",
            "description": f"{p.risk_level} risk from the ML model. Suggested: {urgency_window(p.failure_probability).lower()}.",
            "actionLabel": "Schedule",
            "icon": "Wrench" if i % 2 == 0 else "Lightbulb",
        })

    today = datetime.utcnow()
    offsets = [1, 2, 4, 6]
    calendar = []
    for i, (p, m) in enumerate(picked[:4]):
        calendar.append({
            "id": i + 1,
            "date": (today + timedelta(days=offsets[i])).strftime("%d %b"),
            "title": f"{m.machine_name} - Inspection",
            "status": "Suggested",
            "type": f"{p.risk_level} risk",
        })

    # ---- Anomalies by equipment type ---------------------------------------
    anomalies_group = (
        db.query(Machine.machine_type, func.count(Anomaly.id).label("count"))
        .join(Anomaly, Anomaly.machine_id == Machine.id)
        .group_by(Machine.machine_type)
        .all()
    )
    colors = ["#3b82f6", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6"]

    return {
        "stats": {
            "total_machines": total_machines,
            "active_anomalies": active_anomalies,
            "predicted_failures": predicted_failures,
            "uptime_percentage": round(100 * (1 - active_anomalies / total_machines), 1) if total_machines else 0,
        },
        "health_status": {
            "healthy": healthy_count,
            "warning": warning_count,
            "critical": critical_count,
            "offline": inactive_machines,
        },
        "recent_alerts": [
            {
                "id": r.Anomaly.id,
                "message": f"{r.Anomaly.anomaly_type} - {r.Machine.machine_name}",
                "time_ago": r.Anomaly.detected_at.strftime("%d %b, %H:%M"),
                "severity": SEVERITY_BY_TYPE.get(r.Anomaly.anomaly_type, "info"),
            }
            for r in alert_rows
        ],
        "recommended_actions": actions,
        "predicted_failures_list": [
            {
                "id": p.id,
                "equipment": m.machine_name,
                "failureProbability": int(p.failure_probability * 100),
                "predictedIn": urgency_window(p.failure_probability),
                "risk": p.risk_level,
            }
            for p, m in picked
        ],
        "sensor_data": [
            {
                "time": s.timestamp.strftime("%H:%M"),
                "Vibration": round((s.rpm / 1500) * 15, 2),
                "Temperature": round(s.air_temperature, 2),
                "Pressure": round(s.torque, 2),
                "Flow Rate": round((s.power_consumption / 3000) * 50, 2),
            }
            for s in window
        ],
        "failure_trend": [
            {
                "date": s.timestamp.strftime("%H:%M"),
                "probability": round(probs.get(s.machine_id, 0.0) * 100, 1),
            }
            for s in window
        ],
        "calendar_items": calendar,
        "anomalies_by_equipment": [
            {"name": f"Type {name}", "count": count, "color": colors[i % len(colors)]}
            for i, (name, count) in enumerate(anomalies_group)
        ],
    }