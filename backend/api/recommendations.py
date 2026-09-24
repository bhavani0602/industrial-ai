from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import schemas
from database.session import get_db
from database.models import Recommendation

router = APIRouter(prefix="/api/recommendations", tags=["recommendations"])

@router.get("/", response_model=list[schemas.RecommendationOut])
def list_recommendations(db: Session = Depends(get_db)):
    return db.query(Recommendation).order_by(Recommendation.created_at.desc()).all()

@router.get("/{machine_id}", response_model=list[schemas.RecommendationOut])
def get_machine_recommendations(machine_id: int, db: Session = Depends(get_db)):
    return db.query(Recommendation).filter(Recommendation.machine_id == machine_id).order_by(Recommendation.created_at.desc()).all()
