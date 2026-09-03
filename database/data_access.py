import pandas as pd
from sqlalchemy.orm import Session
from . import crud

def get_machine_data_df(db: Session, machine_id: int = None) -> pd.DataFrame:
    """
    Retrieves sensor readings and returns them as a Pandas DataFrame.
    This is highly optimized for the Machine Learning team.
    
    If machine_id is provided, returns data only for that machine.
    Otherwise, returns a batch of recent readings across all machines.
    """
    # Grab the data using our CRUD operations
    # (We grab a large limit here for ML training purposes)
    readings = crud.get_sensor_readings(db, machine_id=machine_id, limit=10000)
    
    if not readings:
        return pd.DataFrame()
        
    # Convert SQLAlchemy objects to a list of dictionaries
    data = []
    for r in readings:
        data.append({
            "id": r.id,
            "machine_id": r.machine_id,
            "timestamp": r.timestamp,
            "air_temperature": r.air_temperature,
            "process_temperature": r.process_temperature,
            "rpm": r.rpm,
            "torque": r.torque,
            "tool_wear": r.tool_wear,
            "power_consumption": r.power_consumption
        })
        
    # Create the DataFrame
    df = pd.DataFrame(data)
    
    # Set the timestamp as the index since it's time-series data
    df.set_index("timestamp", inplace=True)
    df.sort_index(inplace=True)
    
    return df

def get_anomalies_df(db: Session) -> pd.DataFrame:
    """
    Retrieves all unresolved anomalies as a Pandas DataFrame,
    perfect for building a target feature (y) for supervised learning.
    """
    anomalies = crud.get_unresolved_anomalies(db)
    
    if not anomalies:
        return pd.DataFrame()
        
    data = []
    for a in anomalies:
        data.append({
            "machine_id": a.machine_id,
            "anomaly_type": a.anomaly_type,
            "detected_at": a.detected_at,
            "description": a.description
        })
        
    df = pd.DataFrame(data)
    df.set_index("detected_at", inplace=True)
    df.sort_index(inplace=True)
    
    return df
