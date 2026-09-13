from sqlalchemy.orm import Session
from typing import List, Optional
from . import models

# --- Machine Operations ---

def get_machine(db: Session, machine_id: int):
    """Retrieve a single machine by its ID."""
    return db.query(models.Machine).filter(models.Machine.id == machine_id).first()

def get_machines(db: Session, skip: int = 0, limit: int = 100):
    """Retrieve a list of machines (with pagination)."""
    return db.query(models.Machine).offset(skip).limit(limit).all()

# --- Sensor Reading Operations ---

def get_sensor_readings(db: Session, machine_id: Optional[int] = None, skip: int = 0, limit: int = 1000):
    """
    Retrieve sensor readings. 
    If machine_id is provided, filters readings for that specific machine.
    """
    query = db.query(models.SensorReading)
    if machine_id:
        query = query.filter(models.SensorReading.machine_id == machine_id)
    return query.order_by(models.SensorReading.timestamp.desc()).offset(skip).limit(limit).all()

# --- Anomaly Operations ---

def get_anomalies(db: Session, machine_id: Optional[int] = None, skip: int = 0, limit: int = 100):
    """
    Retrieve logged anomalies/failures.
    If machine_id is provided, filters for that specific machine.
    """
    query = db.query(models.Anomaly)
    if machine_id:
        query = query.filter(models.Anomaly.machine_id == machine_id)
    return query.order_by(models.Anomaly.detected_at.desc()).offset(skip).limit(limit).all()

def get_unresolved_anomalies(db: Session):
    """Retrieve all anomalies that are still marked as 'Unresolved'."""
    return db.query(models.Anomaly).filter(models.Anomaly.status == "Unresolved").all()
