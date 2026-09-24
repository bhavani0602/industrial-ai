from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# ---- Machine ----
class MachineCreate(BaseModel):
    machine_name: str
    machine_type: str
    location: Optional[str] = None
    status: str = "active"
    installation_date: Optional[datetime] = None

class MachineOut(MachineCreate):
    id: int
    class Config:
        from_attributes = True

# ---- Sensor Reading ----
class SensorReadingCreate(BaseModel):
    air_temperature: float
    process_temperature: float
    rpm: int
    torque: float
    tool_wear: int
    power_consumption: float

class SensorReadingOut(SensorReadingCreate):
    id: int
    machine_id: int
    timestamp: datetime
    class Config:
        from_attributes = True

# ---- Maintenance ----
class MaintenanceCreate(BaseModel):
    maintenance_type: str
    description: str
    technician_id: int
    maintenance_date: datetime
    status: str = "scheduled"

class MaintenanceOut(MaintenanceCreate):
    id: int
    machine_id: int
    class Config:
        from_attributes = True

# ---- Prediction ----
class PredictionOut(BaseModel):
    id: int
    machine_id: int
    failure_probability: float
    predicted_failure: bool
    risk_level: str
    model_version: str
    created_at: datetime
    class Config:
        from_attributes = True

# ---- Anomaly ----
class AnomalyOut(BaseModel):
    id: int
    machine_id: int
    anomaly_score: float
    anomaly_type: str
    description: str
    detected_at: datetime
    status: str
    class Config:
        from_attributes = True

# ---- Recommendation ----
class RecommendationOut(BaseModel):
    id: int
    machine_id: int
    prediction_id: Optional[int] = None
    recommendation: str
    priority: str
    status: str
    created_at: datetime
    class Config:
        from_attributes = True