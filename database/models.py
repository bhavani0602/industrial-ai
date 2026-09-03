from datetime import datetime
from typing import List, Optional
from sqlalchemy import String, Integer, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    role: Mapped[str] = mapped_column(String(50)) # Admin, Maintenance Engineer, Operator

    # Relationships
    maintenance_records: Mapped[List["MaintenanceRecord"]] = relationship(back_populates="technician")

class Machine(Base):
    __tablename__ = "machines"

    id: Mapped[int] = mapped_column(primary_key=True)
    machine_name: Mapped[str] = mapped_column(String(100))
    machine_type: Mapped[str] = mapped_column(String(50))
    location: Mapped[Optional[str]] = mapped_column(String(100))
    status: Mapped[str] = mapped_column(String(50))
    installation_date: Mapped[Optional[datetime]] = mapped_column(DateTime)

    # Relationships
    sensor_readings: Mapped[List["SensorReading"]] = relationship(back_populates="machine")
    maintenance_records: Mapped[List["MaintenanceRecord"]] = relationship(back_populates="machine")
    predictions: Mapped[List["Prediction"]] = relationship(back_populates="machine")
    anomalies: Mapped[List["Anomaly"]] = relationship(back_populates="machine")
    recommendations: Mapped[List["Recommendation"]] = relationship(back_populates="machine")

class SensorReading(Base):
    __tablename__ = "sensor_readings"

    id: Mapped[int] = mapped_column(primary_key=True)
    machine_id: Mapped[int] = mapped_column(ForeignKey("machines.id"))
    
    # Mapped directly to ai4i2020_cleaned.csv
    air_temperature: Mapped[float] = mapped_column(Float)
    process_temperature: Mapped[float] = mapped_column(Float)
    rpm: Mapped[int] = mapped_column(Integer)
    torque: Mapped[float] = mapped_column(Float)
    tool_wear: Mapped[int] = mapped_column(Integer)
    power_consumption: Mapped[float] = mapped_column(Float)
    
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationship
    machine: Mapped["Machine"] = relationship(back_populates="sensor_readings")

class MaintenanceRecord(Base):
    __tablename__ = "maintenance_records"

    id: Mapped[int] = mapped_column(primary_key=True)
    machine_id: Mapped[int] = mapped_column(ForeignKey("machines.id"))
    maintenance_type: Mapped[str] = mapped_column(String(100))
    description: Mapped[str] = mapped_column(String(500))
    technician_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    maintenance_date: Mapped[datetime] = mapped_column(DateTime)
    status: Mapped[str] = mapped_column(String(50))

    # Relationships
    machine: Mapped["Machine"] = relationship(back_populates="maintenance_records")
    technician: Mapped["User"] = relationship(back_populates="maintenance_records")

class Prediction(Base):
    __tablename__ = "predictions"

    id: Mapped[int] = mapped_column(primary_key=True)
    machine_id: Mapped[int] = mapped_column(ForeignKey("machines.id"))
    failure_probability: Mapped[float] = mapped_column(Float)
    predicted_failure: Mapped[bool] = mapped_column(Boolean)
    risk_level: Mapped[str] = mapped_column(String(50))
    model_version: Mapped[str] = mapped_column(String(50))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    machine: Mapped["Machine"] = relationship(back_populates="predictions")
    recommendations: Mapped[List["Recommendation"]] = relationship(back_populates="prediction")

class Anomaly(Base):
    __tablename__ = "anomalies"

    id: Mapped[int] = mapped_column(primary_key=True)
    machine_id: Mapped[int] = mapped_column(ForeignKey("machines.id"))
    anomaly_score: Mapped[float] = mapped_column(Float)
    anomaly_type: Mapped[str] = mapped_column(String(100))
    description: Mapped[str] = mapped_column(String(500))
    detected_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    status: Mapped[str] = mapped_column(String(50))

    # Relationship
    machine: Mapped["Machine"] = relationship(back_populates="anomalies")

class Recommendation(Base):
    __tablename__ = "recommendations"

    id: Mapped[int] = mapped_column(primary_key=True)
    machine_id: Mapped[int] = mapped_column(ForeignKey("machines.id"))
    prediction_id: Mapped[Optional[int]] = mapped_column(ForeignKey("predictions.id"))
    recommendation: Mapped[str] = mapped_column(String(500))
    priority: Mapped[str] = mapped_column(String(50))
    status: Mapped[str] = mapped_column(String(50))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    machine: Mapped["Machine"] = relationship(back_populates="recommendations")
    prediction: Mapped[Optional["Prediction"]] = relationship(back_populates="recommendations")
