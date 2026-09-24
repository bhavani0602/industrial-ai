from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import schemas
from database.session import get_db
from database.models import Machine

router = APIRouter(prefix="/api/machines", tags=["machines"])

@router.post("/", response_model=schemas.MachineOut)
def create_machine(machine: schemas.MachineCreate, db: Session = Depends(get_db)):
    new_machine = Machine(**machine.dict())
    db.add(new_machine)
    db.commit()
    db.refresh(new_machine)
    return new_machine

@router.get("/", response_model=list[schemas.MachineOut])
def list_machines(db: Session = Depends(get_db)):
    return db.query(Machine).all()

@router.get("/{machine_id}", response_model=schemas.MachineOut)
def get_machine(machine_id: int, db: Session = Depends(get_db)):
    machine = db.query(Machine).filter(Machine.id == machine_id).first()
    if not machine:
        raise HTTPException(status_code=404, detail="Machine not found")
    return machine

@router.put("/{machine_id}", response_model=schemas.MachineOut)
def update_machine(machine_id: int, machine: schemas.MachineCreate, db: Session = Depends(get_db)):
    existing = db.query(Machine).filter(Machine.id == machine_id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Machine not found")
    for key, value in machine.dict().items():
        setattr(existing, key, value)
    db.commit()
    db.refresh(existing)
    return existing

@router.delete("/{machine_id}")
def deactivate_machine(machine_id: int, db: Session = Depends(get_db)):
    machine = db.query(Machine).filter(Machine.id == machine_id).first()
    if not machine:
        raise HTTPException(status_code=404, detail="Machine not found")
    machine.status = "inactive"
    db.commit()
    return {"message": "Machine deactivated"}