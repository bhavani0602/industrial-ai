from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api import machines, sensors

app = FastAPI(title="Industrial AI Maintenance System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(machines.router)
app.include_router(sensors.router)

@app.get("/")
def read_root():
    return {"message": "Industrial AI backend is running"}
