import type {
  Machine,
  SensorTimePoint,
  Anomaly,
  MaintenanceRecord,
  Prediction,
  EquipmentHealthSlice,
  PredictedFailure,
  AlertItem,
  SensorAnomalyPoint,
  FailureTrendPoint,
  AnomalyByEquipment,
  RecommendedAction,
  CalendarItem,
} from "./types";

// ── Existing data (used by maintenance page) ──────────────────────

export const machines: Machine[] = [
  { id: 1, machine_name: "CNC-Mill-01", machine_type: "M", location: "Factory Floor A", status: "Active", installation_date: "2023-03-15", health_score: 92 },
  { id: 2, machine_name: "Lathe-02", machine_type: "L", location: "Factory Floor A", status: "Active", installation_date: "2022-11-20", health_score: 78 },
  { id: 3, machine_name: "Press-03", machine_type: "H", location: "Factory Floor B", status: "Under Maintenance", installation_date: "2021-06-10", health_score: 45 },
  { id: 4, machine_name: "Grinder-04", machine_type: "M", location: "Factory Floor B", status: "Active", installation_date: "2023-01-08", health_score: 88 },
  { id: 5, machine_name: "Drill-05", machine_type: "L", location: "Factory Floor C", status: "Idle", installation_date: "2022-07-22", health_score: 65 },
  { id: 6, machine_name: "Welder-06", machine_type: "H", location: "Factory Floor C", status: "Active", installation_date: "2024-02-14", health_score: 95 },
];

export const sensorTimeSeries: SensorTimePoint[] = Array.from(
  { length: 24 },
  (_, i) => {
    const hour = String(i).padStart(2, "0");
    return {
      time: `${hour}:00`,
      air_temperature: +(295 + Math.random() * 10).toFixed(1),
      process_temperature: +(305 + Math.random() * 8).toFixed(1),
      rpm: Math.round(1300 + Math.random() * 500),
      torque: +(35 + Math.random() * 25).toFixed(1),
      tool_wear: Math.round(i * 9 + Math.random() * 10),
      power_consumption: +(5000 + Math.random() * 4000).toFixed(1),
    };
  }
);

export const recentAnomalies: Anomaly[] = [
  { id: 1, machine_id: 3, machine_name: "Press-03", anomaly_score: 0.94, anomaly_type: "Heat Dissipation Failure (HDF)", description: "Process temperature exceeded safe threshold by 12°C", detected_at: "2026-09-10T09:15:00", status: "Unresolved" },
  { id: 2, machine_id: 5, machine_name: "Drill-05", anomaly_score: 0.87, anomaly_type: "Tool Wear Failure (TWF)", description: "Tool wear reached critical level at 215 min", detected_at: "2026-09-10T08:42:00", status: "Investigating" },
  { id: 3, machine_id: 2, machine_name: "Lathe-02", anomaly_score: 0.76, anomaly_type: "Power Failure (PWF)", description: "Power consumption spike detected — 9200W sustained", detected_at: "2026-09-10T07:30:00", status: "Unresolved" },
  { id: 4, machine_id: 3, machine_name: "Press-03", anomaly_score: 0.91, anomaly_type: "Overstrain Failure (OSF)", description: "Torque exceeded 58 Nm at low RPM condition", detected_at: "2026-09-10T06:10:00", status: "Unresolved" },
  { id: 5, machine_id: 1, machine_name: "CNC-Mill-01", anomaly_score: 0.62, anomaly_type: "Random Failures (RNF)", description: "Unexpected vibration pattern during idle cycle", detected_at: "2026-09-09T22:05:00", status: "Resolved" },
  { id: 6, machine_id: 4, machine_name: "Grinder-04", anomaly_score: 0.71, anomaly_type: "Heat Dissipation Failure (HDF)", description: "Temp differential rose above 15°C threshold", detected_at: "2026-09-09T19:48:00", status: "Resolved" },
  { id: 7, machine_id: 5, machine_name: "Drill-05", anomaly_score: 0.83, anomaly_type: "Tool Wear Failure (TWF)", description: "Progressive wear rate 40% above normal", detected_at: "2026-09-09T16:20:00", status: "Investigating" },
  { id: 8, machine_id: 2, machine_name: "Lathe-02", anomaly_score: 0.58, anomaly_type: "Overstrain Failure (OSF)", description: "Torque-RPM ratio outside normal envelope", detected_at: "2026-09-09T14:00:00", status: "Resolved" },
];

export const predictions: Prediction[] = [
  { id: 1, machine_id: 1, failure_probability: 0.08, predicted_failure: false, risk_level: "LOW", model_version: "v1.2", created_at: "2026-09-10T00:00:00" },
  { id: 2, machine_id: 2, failure_probability: 0.42, predicted_failure: false, risk_level: "MEDIUM", model_version: "v1.2", created_at: "2026-09-10T00:00:00" },
  { id: 3, machine_id: 3, failure_probability: 0.85, predicted_failure: true, risk_level: "HIGH", model_version: "v1.2", created_at: "2026-09-10T00:00:00" },
  { id: 4, machine_id: 4, failure_probability: 0.12, predicted_failure: false, risk_level: "LOW", model_version: "v1.2", created_at: "2026-09-10T00:00:00" },
  { id: 5, machine_id: 5, failure_probability: 0.55, predicted_failure: true, risk_level: "MEDIUM", model_version: "v1.2", created_at: "2026-09-10T00:00:00" },
  { id: 6, machine_id: 6, failure_probability: 0.05, predicted_failure: false, risk_level: "LOW", model_version: "v1.2", created_at: "2026-09-10T00:00:00" },
];

export const maintenanceRecords: MaintenanceRecord[] = [
  { id: 1, machine_id: 3, machine_name: "Press-03", maintenance_type: "Corrective", description: "Replace heat dissipation unit and thermal paste", technician: "Rajesh Kumar", maintenance_date: "2026-09-10T10:00:00", status: "In Progress", priority: "Critical" },
  { id: 2, machine_id: 5, machine_name: "Drill-05", maintenance_type: "Preventive", description: "Tool bit replacement — scheduled after 200h usage", technician: "Priya Sharma", maintenance_date: "2026-09-11T08:00:00", status: "Scheduled", priority: "High" },
  { id: 3, machine_id: 1, machine_name: "CNC-Mill-01", maintenance_type: "Preventive", description: "Quarterly lubrication and belt inspection", technician: "Anil Verma", maintenance_date: "2026-09-12T09:00:00", status: "Scheduled", priority: "Medium" },
  { id: 4, machine_id: 2, machine_name: "Lathe-02", maintenance_type: "Corrective", description: "Investigate power consumption spike — check motor windings", technician: "Rajesh Kumar", maintenance_date: "2026-09-10T14:00:00", status: "Scheduled", priority: "High" },
  { id: 5, machine_id: 4, machine_name: "Grinder-04", maintenance_type: "Preventive", description: "Cooling system flush and filter replacement", technician: "Meena Patel", maintenance_date: "2026-09-08T10:00:00", status: "Completed", priority: "Medium" },
  { id: 6, machine_id: 6, machine_name: "Welder-06", maintenance_type: "Preventive", description: "Electrode calibration and safety check", technician: "Anil Verma", maintenance_date: "2026-09-07T11:00:00", status: "Completed", priority: "Low" },
  { id: 7, machine_id: 1, machine_name: "CNC-Mill-01", maintenance_type: "Corrective", description: "Vibration damper replacement after RNF event", technician: "Priya Sharma", maintenance_date: "2026-09-06T08:30:00", status: "Completed", priority: "High" },
  { id: 8, machine_id: 3, machine_name: "Press-03", maintenance_type: "Corrective", description: "Torque limiter recalibration after OSF event", technician: "Rajesh Kumar", maintenance_date: "2026-09-05T09:00:00", status: "Completed", priority: "Critical" },
  { id: 9, machine_id: 2, machine_name: "Lathe-02", maintenance_type: "Predictive", description: "Bearing replacement — predicted failure in 14 days", technician: "Meena Patel", maintenance_date: "2026-09-13T10:00:00", status: "Scheduled", priority: "Medium" },
  { id: 10, machine_id: 5, machine_name: "Drill-05", maintenance_type: "Corrective", description: "Spindle motor overhaul after prolonged high-wear operation", technician: "Anil Verma", maintenance_date: "2026-09-04T07:00:00", status: "Completed", priority: "High" },
  { id: 11, machine_id: 4, machine_name: "Grinder-04", maintenance_type: "Preventive", description: "Annual electrical inspection and safety certification", technician: "Priya Sharma", maintenance_date: "2026-09-15T09:00:00", status: "Scheduled", priority: "Low" },
  { id: 12, machine_id: 6, machine_name: "Welder-06", maintenance_type: "Preventive", description: "Gas flow sensor calibration", technician: "Meena Patel", maintenance_date: "2026-09-03T13:00:00", status: "Completed", priority: "Low" },
];

export const riskDistribution = [
  { level: "LOW", count: 3, fill: "#22c55e" },
  { level: "MEDIUM", count: 2, fill: "#f59e0b" },
  { level: "HIGH", count: 1, fill: "#ef4444" },
];

export function getDashboardKPIs() {
  const totalMachines = machines.length;
  const activeAlerts = recentAnomalies.filter((a) => a.status !== "Resolved").length;
  const avgHealth = Math.round(machines.reduce((sum, m) => sum + m.health_score, 0) / machines.length);
  const upcomingMaintenance = maintenanceRecords.filter((r) => r.status === "Scheduled").length;
  return { totalMachines, activeAlerts, avgHealth, upcomingMaintenance };
}

export function getMaintenanceKPIs() {
  const total = maintenanceRecords.length;
  const scheduled = maintenanceRecords.filter((r) => r.status === "Scheduled").length;
  const inProgress = maintenanceRecords.filter((r) => r.status === "In Progress").length;
  const completed = maintenanceRecords.filter((r) => r.status === "Completed").length;
  const overdue = maintenanceRecords.filter((r) => r.status === "Overdue").length;
  return { total, scheduled, inProgress, completed, overdue };
}

// ── NEW: Dashboard data matching PredictAI screenshot ─────────────

export const equipmentHealth: EquipmentHealthSlice[] = [
  { name: "Healthy", value: 32, percentage: "67%", color: "#22c55e" },
  { name: "Warning", value: 9, percentage: "19%", color: "#f59e0b" },
  { name: "Critical", value: 5, percentage: "10%", color: "#ef4444" },
  { name: "Offline", value: 2, percentage: "4%", color: "#94a3b8" },
];

export const predictedFailures: PredictedFailure[] = [
  { id: 1, equipment: "Pump P-101", failureProbability: 82, predictedIn: "2 days", risk: "High" },
  { id: 2, equipment: "Compressor C-07", failureProbability: 67, predictedIn: "4 days", risk: "High" },
  { id: 3, equipment: "Motor M-204", failureProbability: 54, predictedIn: "5 days", risk: "Medium" },
  { id: 4, equipment: "Fan F-301", failureProbability: 48, predictedIn: "6 days", risk: "Medium" },
  { id: 5, equipment: "Conveyor CV-03", failureProbability: 32, predictedIn: "7 days", risk: "Low" },
];

export const alertItems: AlertItem[] = [
  { id: 1, message: "High vibration detected - Pump P-101", time: "2 minutes ago", severity: "critical" },
  { id: 2, message: "Temperature spike - Motor M-204", time: "15 minutes ago", severity: "critical" },
  { id: 3, message: "Abnormal pressure - Compressor C-07", time: "1 hour ago", severity: "warning" },
  { id: 4, message: "Anomaly detected - Heat Exchanger HX-21", time: "3 hours ago", severity: "info" },
  { id: 5, message: "Unusual energy consumption - Line 3", time: "5 hours ago", severity: "info" },
];

export const sensorAnomalyData: SensorAnomalyPoint[] = [
  { time: "00:00", actual: 5.2, threshold: 15 },
  { time: "02:00", actual: 4.8, threshold: 15 },
  { time: "04:00", actual: 5.5, threshold: 15 },
  { time: "06:00", actual: 6.1, threshold: 15 },
  { time: "08:00", actual: 7.8, threshold: 15 },
  { time: "10:00", actual: 9.2, threshold: 15 },
  { time: "12:00", actual: 8.5, threshold: 15 },
  { time: "13:00", actual: 10.1, threshold: 15 },
  { time: "14:00", actual: 12.4, threshold: 15 },
  { time: "14:30", actual: 18.2, threshold: 15 },
  { time: "15:00", actual: 16.8, threshold: 15 },
  { time: "16:00", actual: 14.2, threshold: 15 },
  { time: "18:00", actual: 9.8, threshold: 15 },
  { time: "20:00", actual: 7.5, threshold: 15 },
  { time: "22:00", actual: 6.2, threshold: 15 },
  { time: "24:00", actual: 5.8, threshold: 15 },
];

export const failureTrendData: FailureTrendPoint[] = [
  { date: "Sep 09", probability: 12 },
  { date: "Sep 10", probability: 15 },
  { date: "Sep 11", probability: 18 },
  { date: "Sep 12", probability: 22 },
  { date: "Sep 13", probability: 35 },
  { date: "Sep 14", probability: 42 },
  { date: "Sep 15", probability: 55 },
  { date: "Sep 16", probability: 67 },
];

export const anomaliesByEquipment: AnomalyByEquipment[] = [
  { type: "Pumps", count: 8, color: "#ef4444" },
  { type: "Compressors", count: 6, color: "#f97316" },
  { type: "Motors", count: 5, color: "#f59e0b" },
  { type: "Conveyors", count: 4, color: "#eab308" },
  { type: "Heat Exchangers", count: 3, color: "#3b82f6" },
  { type: "Fans", count: 2, color: "#1e40af" },
];

export const recommendedActions: RecommendedAction[] = [
  { id: 1, title: "Schedule maintenance for Pump P-101", description: "High vibration levels detected. Recommended within 2 days.", severity: "critical", actionLabel: "Create Work Order" },
  { id: 2, title: "Check bearing condition for Compressor C-07", description: "Failure probability 67%. Inspect during next shutdown.", severity: "warning", actionLabel: "View Details" },
  { id: 3, title: "Optimize operating temperature", description: "Current temperature is higher than optimal range. Potential 8% energy savings.", severity: "info", actionLabel: "View Recommendations" },
];

export const calendarItems: CalendarItem[] = [
  { id: 1, month: "SEP", day: 16, title: "Pump P-101 - Inspection", description: "Check vibration and alignments", tag: "Today" },
  { id: 2, month: "SEP", day: 18, title: "Compressor C-07 - Maintenance", description: "Bearing replacement", tag: "Upcoming" },
  { id: 3, month: "SEP", day: 20, title: "Heat Exchanger HX-21 - Cleaning", description: "Routine cleaning", tag: "Upcoming" },
  { id: 4, month: "SEP", day: 22, title: "Motor M-204 - Inspection", description: "Electrical check and lubrication", tag: "Upcoming" },
];
