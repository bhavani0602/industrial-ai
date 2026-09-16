from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import schemas
from database.session import get_db
from database.models import SensorReading, Machine

router = APIRouter(prefix="/api/machines", tags=["sensors"])

@router.post("/{machine_id}/sensor-readings", response_model=schemas.SensorReadingOut)
def add_sensor_reading(machine_id: int, reading: schemas.SensorReadingCreate, db: Session = Depends(get_db)):
    machine = db.query(Machine).filter(Machine.id == machine_id).first()
    if not machine:
        raise HTTPException(status_code=404, detail="Machine not found")
    new_reading = SensorReading(machine_id=machine_id, **reading.dict())
    db.add(new_reading)
    db.commit()
    db.refresh(new_reading)
    return new_reading

@router.get("/{machine_id}/sensor-readings", response_model=list[schemas.SensorReadingOut])
def get_sensor_readings(machine_id: int, db: Session = Depends(get_db)):
    return db.query(SensorReading).filter(SensorReading.machine_id == machine_id).all()