from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import schemas
from database.session import get_db
from database.models import MaintenanceRecord

router = APIRouter(prefix="/api/maintenance", tags=["maintenance"])

@router.get("/", response_model=list[schemas.MaintenanceOut])
def list_maintenance_records(db: Session = Depends(get_db)):
    return db.query(MaintenanceRecord).order_by(MaintenanceRecord.maintenance_date.desc()).all()

@router.get("/{machine_id}", response_model=list[schemas.MaintenanceOut])
def get_machine_maintenance(machine_id: int, db: Session = Depends(get_db)):
    return db.query(MaintenanceRecord).filter(MaintenanceRecord.machine_id == machine_id).order_by(MaintenanceRecord.maintenance_date.desc()).all()
