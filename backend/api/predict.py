import math
import os

import joblib
import pandas as pd
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api/predict", tags=["predict"])

# ml/failure_model.pkl, found relative to the project root
MODEL_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
    "ml",
    "failure_model.pkl",
)

FEATURE_COLS = [
    "air_temperature", "process_temperature", "rpm", "torque",
    "tool_wear", "power_consumption", "temp_diff", "type_encoded",
]
TYPE_CODES = {"L": 0, "M": 1, "H": 2}

_model = None


def get_model():
    global _model
    if _model is None:
        _model = joblib.load(MODEL_PATH)
    return _model


class PredictInput(BaseModel):
    machine_type: str = "L"        # L, M or H
    air_temperature: float         # Kelvin
    process_temperature: float     # Kelvin
    rpm: float
    torque: float                  # Nm
    tool_wear: float               # minutes


def risk_level(p: float) -> str:
    if p > 0.7:
        return "High"
    if p >= 0.3:
        return "Medium"
    return "Low"


@router.post("/")
def predict(data: PredictInput):
    t = data.machine_type.strip().upper()
    if t not in TYPE_CODES:
        raise HTTPException(status_code=400, detail="machine_type must be L, M or H")

    row = pd.DataFrame([{
        "air_temperature": data.air_temperature,
        "process_temperature": data.process_temperature,
        "rpm": data.rpm,
        "torque": data.torque,
        "tool_wear": data.tool_wear,
        "power_consumption": data.torque * data.rpm * 2 * math.pi / 60,
        "temp_diff": data.process_temperature - data.air_temperature,
        "type_encoded": TYPE_CODES[t],
    }])[FEATURE_COLS]

    prob = float(get_model().predict_proba(row)[0, 1])
    return {
        "failure_probability": round(prob * 100, 1),
        "risk_level": risk_level(prob),
        "machine_health": round(100 - prob * 100, 1),
    }