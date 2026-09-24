from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import schemas
from database.session import get_db
from database.models import Prediction

router = APIRouter(prefix="/api/predictions", tags=["predictions"])

@router.get("/", response_model=list[schemas.PredictionOut])
def list_predictions(db: Session = Depends(get_db)):
    return db.query(Prediction).order_by(Prediction.created_at.desc()).all()

@router.get("/{machine_id}", response_model=list[schemas.PredictionOut])
def get_machine_predictions(machine_id: int, db: Session = Depends(get_db)):
    return db.query(Prediction).filter(Prediction.machine_id == machine_id).order_by(Prediction.created_at.desc()).all()
