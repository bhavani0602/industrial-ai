import os
import sys
from datetime import datetime, timedelta

import pandas as pd
from sqlalchemy import func

# Ensure Python can find the project modules.
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PROJECT_ROOT)

from database.session import SessionLocal
from database.models import Machine, SensorReading, Anomaly

CSV_FILE_PATH = os.path.join(PROJECT_ROOT, "data", "ai4i2020_cleaned.csv")

NUM_SIMULATED_MACHINES = 10
BATCH_SIZE = 1000


def get_failure_type(row):
    failure_types = [
        ("twf", "Tool Wear Failure (TWF)"),
        ("hdf", "Heat Dissipation Failure (HDF)"),
        ("pwf", "Power Failure (PWF)"),
        ("osf", "Overstrain Failure (OSF)"),
        ("rnf", "Random Failure (RNF)"),
    ]

    for column, label in failure_types:
        if row[column] == 1:
            return label

    return "Unknown"


def run_import():
    print("Starting AI4I dataset import...")

    if not os.path.exists(CSV_FILE_PATH):
        print(f"Dataset not found: {CSV_FILE_PATH}")
        return

    df = pd.read_csv(CSV_FILE_PATH)

    required_columns = [
        "product_id",
        "type",
        "air_temperature",
        "process_temperature",
        "rpm",
        "torque",
        "tool_wear",
        "power_consumption",
        "machine_failure",
        "twf",
        "hdf",
        "pwf",
        "osf",
        "rnf",
    ]

    missing = set(required_columns) - set(df.columns)
    if missing:
        print(f"Missing required columns: {sorted(missing)}")
        return

    df = df.reset_index(drop=True)

    if len(df) % NUM_SIMULATED_MACHINES != 0:
        print("Dataset rows cannot be divided evenly.")
        return

    db = SessionLocal()

    try:
        # Prevent an accidental second import.
        existing_readings = db.query(SensorReading).count()
        existing_anomalies = db.query(Anomaly).count()

        if existing_readings or existing_anomalies:
            print(
                "Import stopped: sensor readings or anomalies "
                "already exist. Check the database before retrying."
            )
            return

        # Create ten clearly labeled simulated machines.
        machine_mapping = {}

        for machine_number in range(1, NUM_SIMULATED_MACHINES + 1):
            machine_name = f"AI4I-Simulated-Machine-{machine_number:02d}"

            existing_machine = (
                db.query(Machine).filter(Machine.machine_name == machine_name).first()
            )

            if existing_machine:
                machine = existing_machine
                machine.status = "Active"
            else:
                machine = Machine(
                    machine_name=machine_name,
                    machine_type="AI4I Simulated",
                    location="Simulated Environment",
                    status="Active",
                    installation_date=datetime.utcnow(),
                )
                db.add(machine)

            machine_mapping[machine_number] = machine

        # Persist machine records and obtain their database IDs.
        db.flush()

        print(f"Prepared {NUM_SIMULATED_MACHINES} simulated machines.")

        base_time = datetime.utcnow() - timedelta(days=30)
        rows_per_machine = len(df) // NUM_SIMULATED_MACHINES

        readings_to_insert = []
        anomalies_to_insert = []

        for index, row in df.iterrows():
            machine_number = (index // rows_per_machine) + 1

            machine = machine_mapping[machine_number]
            current_time = base_time + timedelta(minutes=index)

            readings_to_insert.append(
                SensorReading(
                    machine_id=machine.id,
                    air_temperature=float(row["air_temperature"]),
                    process_temperature=float(row["process_temperature"]),
                    rpm=int(row["rpm"]),
                    torque=float(row["torque"]),
                    tool_wear=int(row["tool_wear"]),
                    power_consumption=float(row["power_consumption"]),
                    timestamp=current_time,
                )
            )

            if int(row["machine_failure"]) == 1:
                anomalies_to_insert.append(
                    Anomaly(
                        machine_id=machine.id,
                        anomaly_score=1.0,
                        anomaly_type=get_failure_type(row),
                        description=("Recorded failure event from the AI4I dataset."),
                        detected_at=current_time,
                        status="Unresolved",
                    )
                )

            if len(readings_to_insert) >= BATCH_SIZE:
                db.add_all(readings_to_insert)
                db.add_all(anomalies_to_insert)
                db.flush()

                readings_to_insert.clear()
                anomalies_to_insert.clear()

                print(f"Processed {index + 1} of {len(df)} rows.")

        # Insert the final partial batch.
        db.add_all(readings_to_insert)
        db.add_all(anomalies_to_insert)

        db.commit()

        print("Import completed successfully.")
        print(f"Dataset rows: {len(df)}")
        print(f"Simulated machines: {NUM_SIMULATED_MACHINES}")
        print(f"Readings imported: {len(df)}")
        print("Failure events: " f"{int(df['machine_failure'].sum())}")
        print(
            "Note: machine assignments and timestamps are simulated; "
            "sensor values come from the dataset."
        )

    except Exception as error:
        db.rollback()
        print(f"Import failed; transaction rolled back: {error}")

    finally:
        db.close()
        print("Database connection closed.")


if __name__ == "__main__":
    run_import()
