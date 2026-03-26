// import { sprintData as defaultData } from "../../constants/dashboardData";
import { sprintData as defaultData } from "../constants/dashboardData";

/**
 * SprintVelocityChart
 * Props:
 *   data  {Array}  – array of { label, planned, done }
 *                   defaults to dashboardData.sprintData
 */
export default function SprintVelocityChart({ data = defaultData }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "0.5px solid #e2dfd8",
        borderRadius: 12,
        padding: "18px 20px",
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1917", marginBottom: 10 }}>
        Sprint velocity
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
        {[
          { color: "#1D9E75", label: "Completed" },
          { color: "#c8c5be", label: "Planned" },
        ].map((l) => (
          <div
            key={l.label}
            style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#888780" }}
          >
            <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>

      {/* Bars */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 90 }}>
        {data.map((s) => (
          <div
            key={s.label}
            style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}
          >
            <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 80 }}>
              <div
                style={{
                  flex: 1,
                  borderRadius: "3px 3px 0 0",
                  background: "#e2dfd8",
                  height: `${s.planned}%`,
                  minHeight: 4,
                }}
              />
              <div
                style={{
                  flex: 1,
                  borderRadius: "3px 3px 0 0",
                  background: "#1D9E75",
                  height: `${s.done}%`,
                  minHeight: 4,
                  transition: "height 0.5s ease",
                }}
              />
            </div>
            <div
              style={{ fontSize: 10, color: "#b0ada6", textAlign: "center", marginTop: 4 }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}