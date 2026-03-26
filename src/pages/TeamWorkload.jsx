// import { Avatar, ProgressBar, StatusDot } from "../ui/DashboardPrimitives";
import { Avatar, ProgressBar, StatusDot } from "../components/ui/DashboardPrimitives";
// import { teamMembers as defaultMembers } from "../../constants/dashboardData";
import { teamMembers as defaultMembers } from "../constants/dashboardData";

/**
 * TeamWorkload
 * Props:
 *   members   {Array}        – array of team member objects
 *                              defaults to dashboardData.teamMembers
 *   onManage  {() => void}
 */
export default function TeamWorkload({ members = defaultMembers, onManage }) {
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
        <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1917" }}>Team workload</span>
        <span
          onClick={onManage}
          style={{ fontSize: 12, color: "#1D9E75", cursor: "pointer" }}
        >
          Manage
        </span>
      </div>

      {members.map((m) => (
        <div
          key={m.initials}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 0",
            borderBottom: "0.5px solid #f0ede5",
          }}
        >
          <Avatar initials={m.initials} bg={m.bg} color={m.color} size={30} />

          <div style={{ minWidth: 90 }}>
            <div style={{ fontSize: 13, color: "#1a1917" }}>{m.name}</div>
            <div style={{ fontSize: 11, color: "#b0ada6" }}>{m.role}</div>
          </div>

          <div style={{ flex: 1, margin: "0 10px" }}>
            <ProgressBar value={m.load} color={m.loadColor} />
          </div>

          <div style={{ fontSize: 11, color: "#b0ada6", whiteSpace: "nowrap" }}>
            {m.tasks} tasks
          </div>

          <StatusDot status={m.status} />
        </div>
      ))}
    </div>
  );
}