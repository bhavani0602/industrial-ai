"""
import_predictions.py
Stores a failure probability for every machine in the `predictions` table.

Probabilities are cross-validated (5-fold): each machine is scored by a model
that did NOT see that machine during training, so the numbers are honest
out-of-sample predictions (not memorised training rows).

Run from the project root:
    uv run python database/import_predictions.py
"""

import os
import sys

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import StratifiedKFold, cross_val_predict

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.session import SessionLocal
from database.models import Machine, Prediction

CSV_FILE_PATH = os.path.join("data", "ai4i2020_cleaned.csv")

FEATURE_COLS = [
    "air_temperature", "process_temperature", "rpm", "torque",
    "tool_wear", "power_consumption", "temp_diff", "type_encoded",
]


def risk_label(p):
    if p > 0.7:
        return "High"
    if p >= 0.3:
        return "Medium"
    return "Low"


def run_import():
    print("Reading data...")
    df = pd.read_csv(CSV_FILE_PATH)

    print("Computing cross-validated failure probabilities (about a minute)...")
    model = RandomForestClassifier(
        n_estimators=200, random_state=42, class_weight="balanced", n_jobs=-1
    )
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    df["failure_probability"] = cross_val_predict(
        model, df[FEATURE_COLS], df["machine_failure"], cv=cv, method="predict_proba"
    )[:, 1]

    db = SessionLocal()
    try:
        machine_ids = {name: mid for mid, name in db.query(Machine.id, Machine.machine_name).all()}
        db.query(Prediction).delete()

        rows = []
        for product_id, prob in zip(df["product_id"], df["failure_probability"]):
            mid = machine_ids.get(product_id)
            if mid is None:
                continue
            rows.append(
                Prediction(
                    machine_id=mid,
                    failure_probability=float(prob),
                    predicted_failure=bool(prob >= 0.5),
                    risk_level=risk_label(float(prob)),
                    model_version="rf-cv5",
                )
            )

        db.bulk_save_objects(rows)
        db.commit()
        high = sum(1 for r in rows if r.risk_level == "High")
        med = sum(1 for r in rows if r.risk_level == "Medium")
        print(f"Stored {len(rows)} predictions ({high} High, {med} Medium).")
    except Exception as e:
        db.rollback()
        print(f"Error: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    run_import()