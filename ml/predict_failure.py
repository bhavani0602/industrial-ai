"""
predict_failure.py
Trains a classifier on the cleaned AI4I dataset to predict
machine_failure probability + risk level, then stores the results.
"""

import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

FEATURE_COLS = [
    "air_temperature", "process_temperature", "rpm", "torque",
    "tool_wear", "power_consumption", "temp_diff", "type_encoded"
]
TARGET_COL = "machine_failure"


def train_failure_model(df: pd.DataFrame):
    X = df[FEATURE_COLS]
    y = df[TARGET_COL]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    model = RandomForestClassifier(
        n_estimators=200, random_state=42, class_weight="balanced"
    )
    model.fit(X_train, y_train)

    return model, X_test, y_test


def evaluate_model(model, X_test, y_test):
    y_pred = model.predict(X_test)
    print(classification_report(y_test, y_pred, digits=3))
    print("Confusion matrix:\n", confusion_matrix(y_test, y_pred))


def predict_failure(model, df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df["failure_probability"] = model.predict_proba(df[FEATURE_COLS])[:, 1]
    df["risk_level"] = pd.cut(
        df["failure_probability"],
        bins=[-0.01, 0.3, 0.7, 1.0],
        labels=["LOW", "MEDIUM", "HIGH"]
    )
    return df


def calculate_machine_health(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df["machine_health"] = (100 - (df["failure_probability"] * 100)).round(1)
    return df


def store_prediction(df: pd.DataFrame, path: str = "predictions_output.csv"):
    """
    MVP version: saves predictions to a CSV file.
    Later, once the real database is ready, this can be swapped to
    write into the 'predictions' table instead, without changing
    any of the code that calls this function.
    """
    output_cols = [
        "product_id", "failure_probability", "risk_level", "machine_health"
    ]
    df[output_cols].to_csv(path, index=False)
    print(f"\nPredictions saved to: {path}  ({len(df)} rows)")


def save_model(model, path: str = "data/failure_model.pkl"):
    """
    Saves the trained model so it can be loaded later without retraining.
    The RAG/Backend person will use this file directly.
    """
    joblib.dump(model, path)
    print(f"Model saved to: {path}")


if __name__ == "__main__":
    df = pd.read_csv("../data/ai4i2020_cleaned.csv")

    model, X_test, y_test = train_failure_model(df)
    print("=== Model Evaluation ===")
    evaluate_model(model, X_test, y_test)

    result = predict_failure(model, df)
    result = calculate_machine_health(result)

    print("\n=== Example Output (matches roadmap's MVP format) ===")
    sample = result.sort_values("failure_probability", ascending=False).iloc[0]
    print(f"Machine: {sample['product_id']}")
    print(f"Air Temperature: {sample['air_temperature']}°C")
    print(f"Torque: {sample['torque']} Nm")
    print(f"Failure Probability: {sample['failure_probability']:.2f}")
    print(f"Risk Level: {sample['risk_level']}")
    print(f"Machine Health: {sample['machine_health']}")

    store_prediction(result, path="data/predictions_output.csv")

    save_model(model, path="data/failure_model.pkl")
