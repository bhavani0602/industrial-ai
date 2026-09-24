from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import schemas
from database.session import get_db
from database.models import Anomaly

router = APIRouter(prefix="/api/anomalies", tags=["anomalies"])

@router.get("/", response_model=list[schemas.AnomalyOut])
def list_anomalies(db: Session = Depends(get_db)):
    return db.query(Anomaly).order_by(Anomaly.detected_at.desc()).all()

@router.get("/{machine_id}", response_model=list[schemas.AnomalyOut])
def get_machine_anomalies(machine_id: int, db: Session = Depends(get_db)):
    return db.query(Anomaly).filter(Anomaly.machine_id == machine_id).order_by(Anomaly.detected_at.desc()).all()
