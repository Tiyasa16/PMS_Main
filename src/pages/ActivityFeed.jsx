// import { Avatar } from "../ui/DashboardPrimitives";
import { Avatar } from "../components/ui/DashboardPrimitives";
// import { activityFeed as defaultFeed } from "../../constants/dashboardData";
import { activityFeed as defaultFeed } from "../constants/dashboardData";

/**
 * ActivityFeed
 * Props:
 *   feed      {Array}        – array of activity objects
 *                              defaults to dashboardData.activityFeed
 *   onViewAll {() => void}
 */
export default function ActivityFeed({ feed = defaultFeed, onViewAll }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "0.5px solid #e2dfd8",
        borderRadius: 12,
        padding: "18px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1917" }}>Recent activity</span>
        <span
          onClick={onViewAll}
          style={{ fontSize: 12, color: "#1D9E75", cursor: "pointer" }}
        >
          View all
        </span>
      </div>

      {feed.map((a, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            padding: "8px 0",
            borderBottom: "0.5px solid #f0ede5",
          }}
        >
          <Avatar initials={a.initials} bg={a.bg} color={a.color} size={26} />

          <div style={{ flex: 1 }}>
            {/* parts: alternating [bold, normal, bold, normal …] */}
            <div style={{ fontSize: 12.5, color: "#6b6965", lineHeight: 1.5 }}>
              {a.parts.map((part, j) =>
                j % 2 === 0 ? (
                  <strong key={j} style={{ color: "#1a1917", fontWeight: 500 }}>
                    {part}
                  </strong>
                ) : (
                  <span key={j}>{part}</span>
                )
              )}
            </div>
            <div style={{ fontSize: 11, color: "#b0ada6", marginTop: 2 }}>{a.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}