// import { MetricCard } from "../ui/DashboardPrimitives";
import { MetricCard } from "../components/ui/DashboardPrimitives";
// import { metrics } from "../../constants/dashboardData";
import { metrics } from "../constants/dashboardData";

/**
 * MetricsRow
 * Props:
 *   data  {Array}  – array of { label, value, badge, badgeText, subText }
 *                   defaults to dashboardData.metrics
 */
export default function MetricsRow({ data = metrics }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: 12,
      }}
    >
      {data.map((m) => (
        <MetricCard key={m.label} {...m} />
      ))}
    </div>
  );
}