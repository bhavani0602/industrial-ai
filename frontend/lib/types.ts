// Shared TypeScript interfaces — mirrors database/models.py

export interface Machine {
  id: number;
  machine_name: string;
  machine_type: "L" | "M" | "H"; // Low / Medium / High quality
  location?: string;
  status: "Active" | "Idle" | "Under Maintenance" | "Offline";
  installation_date?: string;
  health_score: number; // 0-100, derived from ML predictions
}

export interface SensorReading {
  id: number;
  machine_id: number;
  air_temperature: number;
  process_temperature: number;
  rpm: number;
  torque: number;
  tool_wear: number;
  power_consumption: number;
  timestamp: string;
}

export interface Prediction {
  id: number;
  machine_id: number;
  failure_probability: number;
  predicted_failure: boolean;
  risk_level: "LOW" | "MEDIUM" | "HIGH";
  model_version: string;
  created_at: string;
}

export interface Anomaly {
  id: number;
  machine_id: number;
  machine_name: string; // denormalised for display
  anomaly_score: number;
  anomaly_type: string;
  description: string;
  detected_at: string;
  status: "Unresolved" | "Investigating" | "Resolved";
}

export interface MaintenanceRecord {
  id: number;
  machine_id: number;
  machine_name: string; // denormalised for display
  maintenance_type: string;
  description: string;
  technician: string;
  maintenance_date: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Overdue";
  priority: "Low" | "Medium" | "High" | "Critical";
}

export interface Recommendation {
  id: number;
  machine_id: number;
  prediction_id?: number;
  recommendation: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Pending" | "Accepted" | "Dismissed";
  created_at: string;
}

// Chart-friendly time-series point
export interface SensorTimePoint {
  time: string;
  air_temperature: number;
  process_temperature: number;
  rpm: number;
  torque: number;
  tool_wear: number;
  power_consumption: number;
}
