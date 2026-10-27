"""
predict_input.py
Interactive demo: type machine sensor values, get failure probability and risk.

Run from the ml folder:
    uv run python predict_input.py
"""

import math
import os

import joblib
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(HERE, "failure_model.pkl")

FEATURE_COLS = [
    "air_temperature", "process_temperature", "rpm", "torque",
    "tool_wear", "power_consumption", "temp_diff", "type_encoded",
]
TYPE_CODES = {"L": 0, "M": 1, "H": 2}


def ask_float(prompt, default):
    raw = input(f"{prompt} [{default}]: ").strip()
    return float(raw) if raw else float(default)


def risk_level(p):
    if p > 0.7:
        return "HIGH"
    if p >= 0.3:
        return "MEDIUM"
    return "LOW"


def main():
    model = joblib.load(MODEL_PATH)
    print("\n=== Machine Failure Prediction ===")
    print("Press Enter to accept the value in [brackets].\n")

    while True:
        machine_type = input("Machine type (L / M / H) [L]: ").strip().upper() or "L"
        if machine_type not in TYPE_CODES:
            print("Please enter L, M or H.")
            continue

        air = ask_float("Air temperature (K)", 300.0)
        proc = ask_float("Process temperature (K)", 310.0)
        rpm = ask_float("Rotational speed (rpm)", 1500)
        torque = ask_float("Torque (Nm)", 40.0)
        wear = ask_float("Tool wear (min)", 100)

        row = pd.DataFrame([{
            "air_temperature": air,
            "process_temperature": proc,
            "rpm": rpm,
            "torque": torque,
            "tool_wear": wear,
            "power_consumption": torque * rpm * 2 * math.pi / 60,
            "temp_diff": proc - air,
            "type_encoded": TYPE_CODES[machine_type],
        }])[FEATURE_COLS]

        prob = float(model.predict_proba(row)[0, 1])
        print("\n--- Result ---")
        print(f"Failure probability : {prob * 100:.1f}%")
        print(f"Risk level          : {risk_level(prob)}")
        print(f"Machine health      : {100 - prob * 100:.1f}")
        print("--------------\n")

        if input("Try another machine? (y/n) [y]: ").strip().lower() == "n":
            break


if __name__ == "__main__":
    main()