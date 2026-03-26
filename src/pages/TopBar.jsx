import { COLORS } from "../constants/dashboardData";
import { Avatar, Icon } from "../components/ui/DashboardPrimitives";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

/**
 * TopBar
 */
export default function TopBar({
  greeting,
  dateLabel,
  user,
  // onExport,
}) {
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clear Zustand state
    localStorage.removeItem("accessToken"); // remove token
    navigate("/login"); // redirect to login
  };

  const btnBase = {
    padding: "6px 14px",
    fontSize: 12,
    borderRadius: 7,
    cursor: "pointer",
    fontFamily: "inherit",
  };

  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "0.5px solid #e2dfd8",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* LEFT */}
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#1a1917" }}>
          {greeting ?? "Good morning 👋"}
        </div>
        <div style={{ fontSize: 12, color: "#a8a59e", marginTop: 2 }}>
          {dateLabel ?? ""}
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

       
        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            ...btnBase,
            border: "0.5px solid #c8c5be",
            background: "transparent",
            color: "#3d3c39",
          }}
        >
          Logout
        </button>

        {/* Avatar */}
        <Avatar
          initials={user?.initials ?? "SK"}
          bg={user?.bg ?? "#9FE1CB"}
          color={user?.color ?? "#085041"}
          size={28}
        />
      </div>
    </div>
  );
}