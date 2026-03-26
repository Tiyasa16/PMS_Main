import MetricsRow from "./MetricsRow";
// import ProjectProgress from "./ProjectProgress";
import SprintVelocityChart from "./SprintVelocityChart";
import TeamWorkload from "./TeamWorkload";
import ActivityFeed from "./ActivityFeed";
// import TaskList from "./TaskList";
import { useUserStore } from "../store/userStore";

export default function Dashboard() {
  const user = useUserStore((state) => state.user);

  const CURRENT_USER = {
    initials: user?.name
      ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
      : "U",
    name: user?.name || "User",
    role: "Admin",
    bg: "#9FE1CB",
    color: "#085041",
  };
  console.log("Zustand user:", user);
  return (
    <>
      {/* Row 1 — KPI metrics */}
      <MetricsRow />

      {/* Row 2 — Tasks + Progress & Chart */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
        {/* <TaskList /> */}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* <ProjectProgress /> */}
          <SprintVelocityChart />
        </div>
      </div>

      {/* Row 3 — Team + Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <TeamWorkload />
        <ActivityFeed />
      </div>
    </>
  );
}