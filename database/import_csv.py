import os
import pandas as pd
from datetime import datetime, timedelta
import sys

# Ensure Python can find the 'database' module when running this script directly
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.session import SessionLocal
from database.models import Machine, SensorReading, Anomaly

# Path to your CSV file
CSV_FILE_PATH = os.path.join("data", "ai4i2020_cleaned.csv")

def run_import():
    print("Starting data import process...")
    
    # 1. Read the CSV data
    print(f"Reading data from {CSV_FILE_PATH}...")
    try:
        df = pd.read_csv(CSV_FILE_PATH)
    except FileNotFoundError:
        print(f"Error: Could not find the file at {CSV_FILE_PATH}")
        return

    # 2. Open a database session
    db = SessionLocal()

    try:
        # 3. Extract unique machines and insert them
        # We assume 'product_id' is the unique identifier for a machine
        print("Extracting unique machines...")
        unique_machines_df = df[['product_id', 'type']].drop_duplicates()
        
        machine_mapping = {} # To store product_id -> new database id
        
        for _, row in unique_machines_df.iterrows():
            product_id = row['product_id']
            # Check if machine already exists
            machine = db.query(Machine).filter(Machine.machine_name == product_id).first()
            
            if not machine:
                machine = Machine(
                    machine_name=product_id,
                    machine_type=row['type'],
                    status="Active",
                    installation_date=datetime.utcnow()
                )
                db.add(machine)
                db.commit()
                db.refresh(machine)
                
            machine_mapping[product_id] = machine.id

        print(f"Successfully processed {len(machine_mapping)} unique machines.")

        # 4. Insert sensor readings
        print("Importing sensor readings (this may take a moment)...")
        readings_to_insert = []
        anomalies_to_insert = []
        
        # We will generate sequential timestamps so the data looks like a real time-series
        base_time = datetime.utcnow() - timedelta(days=30)
        
        for index, row in df.iterrows():
            machine_id = machine_mapping[row['product_id']]
            current_time = base_time + timedelta(minutes=index)
            
            # Create the sensor reading record
            reading = SensorReading(
                machine_id=machine_id,
                air_temperature=row['air_temperature'],
                process_temperature=row['process_temperature'],
                rpm=row['rpm'],
                torque=row['torque'],
                tool_wear=row['tool_wear'],
                power_consumption=row['power_consumption'],
                timestamp=current_time
            )
            readings_to_insert.append(reading)
            
            # If the CSV says there was a machine failure, log it as an anomaly!
            if row['machine_failure'] == 1:
                # Figure out which failure type it was based on the binary columns
                failure_type = "Unknown"
                if row['twf'] == 1: failure_type = "Tool Wear Failure (TWF)"
                elif row['hdf'] == 1: failure_type = "Heat Dissipation Failure (HDF)"
                elif row['pwf'] == 1: failure_type = "Power Failure (PWF)"
                elif row['osf'] == 1: failure_type = "Overstrain Failure (OSF)"
                elif row['rnf'] == 1: failure_type = "Random Failures (RNF)"

                anomaly = Anomaly(
                    machine_id=machine_id,
                    anomaly_score=1.0,  # 100% certainty since it's a recorded failure
                    anomaly_type=failure_type,
                    description=f"Recorded failure event in dataset",
                    detected_at=current_time,
                    status="Unresolved"
                )
                anomalies_to_insert.append(anomaly)

            # Batch insert every 1000 rows to save memory
            if len(readings_to_insert) >= 1000:
                db.bulk_save_objects(readings_to_insert)
                db.bulk_save_objects(anomalies_to_insert)
                db.commit()
                readings_to_insert = []
                anomalies_to_insert = []

        # Insert any remaining records
        if readings_to_insert:
            db.bulk_save_objects(readings_to_insert)
            db.bulk_save_objects(anomalies_to_insert)
            db.commit()

        print(f"Successfully imported {len(df)} sensor readings and {len(df[df['machine_failure'] == 1])} anomalies!")

    except Exception as e:
        db.rollback()
        print(f"An error occurred: {e}")
    finally:
        db.close()
        print("Database connection closed.")

if __name__ == "__main__":
    run_import()
