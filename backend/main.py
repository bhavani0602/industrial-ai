from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api import machines, sensors, anomalies, predictions, maintenance, recommendations

app = FastAPI(title="Industrial AI Maintenance System - Complete API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Core Endpoints
app.include_router(machines.router)
app.include_router(sensors.router)

# Newly Added Feature Endpoints
app.include_router(anomalies.router)
app.include_router(predictions.router)
app.include_router(maintenance.router)
app.include_router(recommendations.router)

@app.get("/")
def read_root():
    return {"message": "Industrial AI backend is fully operational!"}
