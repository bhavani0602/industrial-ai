<<<<<<< HEAD
// Shared TypeScript interfaces — mirrors database/models.py
=======
// Shared TypeScript interfaces — mirrors database/models.py + dashboard UI
>>>>>>> main

export interface Machine {
  id: number;
  machine_name: string;
  machine_type: "L" | "M" | "H";
  location?: string;
  status: "Active" | "Idle" | "Under Maintenance" | "Offline";
  installation_date?: string;
  health_score: number;
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
  machine_name: string;
  anomaly_score: number;
  anomaly_type: string;
  description: string;
  detected_at: string;
  status: "Unresolved" | "Investigating" | "Resolved";
}

export interface MaintenanceRecord {
  id: number;
  machine_id: number;
  machine_name: string;
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

export interface SensorTimePoint {
  time: string;
  air_temperature: number;
  process_temperature: number;
  rpm: number;
  torque: number;
  tool_wear: number;
  power_consumption: number;
}

// ── Dashboard-specific types ──────────────────────────────────────

export interface EquipmentHealthSlice {
  name: string;
  value: number;
  percentage: string;
  color: string;
}

export interface PredictedFailure {
  id: number;
  equipment: string;
  failureProbability: number;
  predictedIn: string;
  risk: "High" | "Medium" | "Low";
}

export interface AlertItem {
  id: number;
  message: string;
  time: string;
  severity: "critical" | "warning" | "info";
}

export interface SensorAnomalyPoint {
  time: string;
  actual: number;
  threshold: number;
}

export interface FailureTrendPoint {
  date: string;
  probability: number;
}

export interface AnomalyByEquipment {
  type: string;
  count: number;
  color: string;
}

export interface RecommendedAction {
  id: number;
  title: string;
  description: string;
  severity: "critical" | "warning" | "info";
  actionLabel: string;
}

export interface CalendarItem {
  id: number;
  month: string;
  day: number;
  title: string;
  description: string;
  tag: "Today" | "Upcoming";
}
