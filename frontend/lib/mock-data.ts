import type {
  Machine,
  SensorTimePoint,
  Anomaly,
  MaintenanceRecord,
  Prediction,
} from "./types";

export const machines: Machine[] = [
  {
    id: 1,
    machine_name: "CNC-Mill-01",
    machine_type: "M",
    location: "Factory Floor A",
    status: "Active",
    installation_date: "2023-03-15",
    health_score: 92,
  },
  {
    id: 2,
    machine_name: "Lathe-02",
    machine_type: "L",
    location: "Factory Floor A",
    status: "Active",
    installation_date: "2022-11-20",
    health_score: 78,
  },
  {
    id: 3,
    machine_name: "Press-03",
    machine_type: "H",
    location: "Factory Floor B",
    status: "Under Maintenance",
    installation_date: "2021-06-10",
    health_score: 45,
  },
  {
    id: 4,
    machine_name: "Grinder-04",
    machine_type: "M",
    location: "Factory Floor B",
    status: "Active",
    installation_date: "2023-01-08",
    health_score: 88,
  },
  {
    id: 5,
    machine_name: "Drill-05",
    machine_type: "L",
    location: "Factory Floor C",
    status: "Idle",
    installation_date: "2022-07-22",
    health_score: 65,
  },
  {
    id: 6,
    machine_name: "Welder-06",
    machine_type: "H",
    location: "Factory Floor C",
    status: "Active",
    installation_date: "2024-02-14",
    health_score: 95,
  },
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
  {
    id: 1,
    machine_id: 3,
    machine_name: "Press-03",
    anomaly_score: 0.94,
    anomaly_type: "Heat Dissipation Failure (HDF)",
    description: "Process temperature exceeded safe threshold by 12°C",
    detected_at: "2026-09-10T09:15:00",
    status: "Unresolved",
  },
  {
    id: 2,
    machine_id: 5,
    machine_name: "Drill-05",
    anomaly_score: 0.87,
    anomaly_type: "Tool Wear Failure (TWF)",
    description: "Tool wear reached critical level at 215 min",
    detected_at: "2026-09-10T08:42:00",
    status: "Investigating",
  },
  {
    id: 3,
    machine_id: 2,
    machine_name: "Lathe-02",
    anomaly_score: 0.76,
    anomaly_type: "Power Failure (PWF)",
    description: "Power consumption spike detected — 9200W sustained",
    detected_at: "2026-09-10T07:30:00",
    status: "Unresolved",
  },
  {
    id: 4,
    machine_id: 3,
    machine_name: "Press-03",
    anomaly_score: 0.91,
    anomaly_type: "Overstrain Failure (OSF)",
    description: "Torque exceeded 58 Nm at low RPM condition",
    detected_at: "2026-09-10T06:10:00",
    status: "Unresolved",
  },
  {
    id: 5,
    machine_id: 1,
    machine_name: "CNC-Mill-01",
    anomaly_score: 0.62,
    anomaly_type: "Random Failures (RNF)",
    description: "Unexpected vibration pattern during idle cycle",
    detected_at: "2026-09-09T22:05:00",
    status: "Resolved",
  },
  {
    id: 6,
    machine_id: 4,
    machine_name: "Grinder-04",
    anomaly_score: 0.71,
    anomaly_type: "Heat Dissipation Failure (HDF)",
    description: "Temp differential rose above 15°C threshold",
    detected_at: "2026-09-09T19:48:00",
    status: "Resolved",
  },
  {
    id: 7,
    machine_id: 5,
    machine_name: "Drill-05",
    anomaly_score: 0.83,
    anomaly_type: "Tool Wear Failure (TWF)",
    description: "Progressive wear rate 40% above normal",
    detected_at: "2026-09-09T16:20:00",
    status: "Investigating",
  },
  {
    id: 8,
    machine_id: 2,
    machine_name: "Lathe-02",
    anomaly_score: 0.58,
    anomaly_type: "Overstrain Failure (OSF)",
    description: "Torque-RPM ratio outside normal envelope",
    detected_at: "2026-09-09T14:00:00",
    status: "Resolved",
  },
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
  {
    id: 1,
    machine_id: 3,
    machine_name: "Press-03",
    maintenance_type: "Corrective",
    description: "Replace heat dissipation unit and thermal paste",
    technician: "Rajesh Kumar",
    maintenance_date: "2026-09-10T10:00:00",
    status: "In Progress",
    priority: "Critical",
  },
  {
    id: 2,
    machine_id: 5,
    machine_name: "Drill-05",
    maintenance_type: "Preventive",
    description: "Tool bit replacement — scheduled after 200h usage",
    technician: "Priya Sharma",
    maintenance_date: "2026-09-11T08:00:00",
    status: "Scheduled",
    priority: "High",
  },
  {
    id: 3,
    machine_id: 1,
    machine_name: "CNC-Mill-01",
    maintenance_type: "Preventive",
    description: "Quarterly lubrication and belt inspection",
    technician: "Anil Verma",
    maintenance_date: "2026-09-12T09:00:00",
    status: "Scheduled",
    priority: "Medium",
  },
  {
    id: 4,
    machine_id: 2,
    machine_name: "Lathe-02",
    maintenance_type: "Corrective",
    description: "Investigate power consumption spike — check motor windings",
    technician: "Rajesh Kumar",
    maintenance_date: "2026-09-10T14:00:00",
    status: "Scheduled",
    priority: "High",
  },
  {
    id: 5,
    machine_id: 4,
    machine_name: "Grinder-04",
    maintenance_type: "Preventive",
    description: "Cooling system flush and filter replacement",
    technician: "Meena Patel",
    maintenance_date: "2026-09-08T10:00:00",
    status: "Completed",
    priority: "Medium",
  },
  {
    id: 6,
    machine_id: 6,
    machine_name: "Welder-06",
    maintenance_type: "Preventive",
    description: "Electrode calibration and safety check",
    technician: "Anil Verma",
    maintenance_date: "2026-09-07T11:00:00",
    status: "Completed",
    priority: "Low",
  },
  {
    id: 7,
    machine_id: 1,
    machine_name: "CNC-Mill-01",
    maintenance_type: "Corrective",
    description: "Vibration damper replacement after RNF event",
    technician: "Priya Sharma",
    maintenance_date: "2026-09-06T08:30:00",
    status: "Completed",
    priority: "High",
  },
  {
    id: 8,
    machine_id: 3,
    machine_name: "Press-03",
    maintenance_type: "Corrective",
    description: "Torque limiter recalibration after OSF event",
    technician: "Rajesh Kumar",
    maintenance_date: "2026-09-05T09:00:00",
    status: "Completed",
    priority: "Critical",
  },
  {
    id: 9,
    machine_id: 2,
    machine_name: "Lathe-02",
    maintenance_type: "Predictive",
    description: "Bearing replacement — predicted failure in 14 days",
    technician: "Meena Patel",
    maintenance_date: "2026-09-13T10:00:00",
    status: "Scheduled",
    priority: "Medium",
  },
  {
    id: 10,
    machine_id: 5,
    machine_name: "Drill-05",
    maintenance_type: "Corrective",
    description: "Spindle motor overhaul after prolonged high-wear operation",
    technician: "Anil Verma",
    maintenance_date: "2026-09-04T07:00:00",
    status: "Completed",
    priority: "High",
  },
  {
    id: 11,
    machine_id: 4,
    machine_name: "Grinder-04",
    maintenance_type: "Preventive",
    description: "Annual electrical inspection and safety certification",
    technician: "Priya Sharma",
    maintenance_date: "2026-09-15T09:00:00",
    status: "Scheduled",
    priority: "Low",
  },
  {
    id: 12,
    machine_id: 6,
    machine_name: "Welder-06",
    maintenance_type: "Preventive",
    description: "Gas flow sensor calibration",
    technician: "Meena Patel",
    maintenance_date: "2026-09-03T13:00:00",
    status: "Completed",
    priority: "Low",
  },
];

export const riskDistribution = [
  { level: "LOW", count: 3, fill: "#22c55e" },
  { level: "MEDIUM", count: 2, fill: "#f59e0b" },
  { level: "HIGH", count: 1, fill: "#ef4444" },
];

// Dashboard KPI helpers
export function getDashboardKPIs() {
  const totalMachines = machines.length;
  const activeAlerts = recentAnomalies.filter((a) => a.status !== "Resolved").length;
  const avgHealth = Math.round(
    machines.reduce((sum, m) => sum + m.health_score, 0) / machines.length
  );
  const upcomingMaintenance = maintenanceRecords.filter(
    (r) => r.status === "Scheduled"
  ).length;

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
