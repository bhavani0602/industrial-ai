"""
anomaly_detection.py
Uses the pre-cleaned ai4i2020_cleaned.csv directly for anomaly
detection and failure prediction. No preprocessing.py needed --
that step is already done.
"""

import pandas as pd
import numpy as np

def load_cleaned_data(path="../data/ai4i2020_cleaned.csv"):
    df = pd.read_csv(path)
    return df


def engineer_extra_features(df: pd.DataFrame) -> pd.DataFrame:
    """Add z-score deviation features on top of what's already there."""
    df = df.copy()
    sensor_cols = ["air_temperature", "process_temperature", "rpm",
                   "torque", "tool_wear", "power_consumption", "temp_diff"]

    for col in sensor_cols:
        if col not in df.columns:
            continue
        mean, std = df[col].mean(), df[col].std()
        df[f"{col}_zscore"] = (df[col] - mean) / std

    return df


def detect_anomaly(df: pd.DataFrame, z_threshold: float = 2.5) -> pd.DataFrame:
    df = df.copy()
    zcols = [c for c in df.columns if c.endswith("_zscore")]
    df["is_anomaly"] = df[zcols].abs().gt(z_threshold).any(axis=1)
    df["anomaly_score"] = df[zcols].abs().max(axis=1)
    return df


if __name__ == "__main__":
    df = load_cleaned_data("../data/ai4i2020_cleaned.csv")
    print("Loaded:", df.shape)
    print(df.columns.tolist())

    featured = engineer_extra_features(df)
    result = detect_anomaly(featured)

    print("\nAnomalies flagged:", result["is_anomaly"].sum())
    print("Real failures:", result["machine_failure"].sum())
    overlap = result[result["is_anomaly"] & (result["machine_failure"] == 1)]
    print("Overlap (anomaly AND real failure):", len(overlap))
