import { COLORS, navItems} from "../../constants/dashboardData";
import { IMAGES } from "../../utils/constants";
import { Avatar, Icon } from "../ui/DashboardPrimitives";
import SidebarItem from "./SidebarItem";
/**
 * SideNavbar
 * Props:
 *   activeNav  {string}           – currently highlighted nav label
 *   onNavChange {(label) => void} – called when user clicks a nav item
 *   user        { initials, name, role } – logged-in user info
 */
export default function SideNavbar({ user }) {
  return (
    <nav
      style={{
        background: "#fff",
        borderRight: "0.5px solid #e2dfd8",
        padding: "20px 0",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minHeight: "100vh",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "0 20px 18px",
          borderBottom: "0.5px solid #e2dfd8",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        
        <span style={{ fontSize: 14, fontWeight: 600, justifyContent: "center", alignItems: "center", color: "#002D74" }}><img
                  src={IMAGES.logo}
                  alt="Logo"
                  className="h-12 w-auto object-contain"
                /></span>
      </div>

      {/* Nav items */}
      {navItems.map((item, index) => (
  <SidebarItem key={index} item={item} />
))}

      {/* Projects section */}
      {/* <div
        style={{
          padding: "16px 20px 6px",
          fontSize: 11,
          fontWeight: 600,
          color: "#b0ada6",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginTop: 8,
        }}
      >
        
      </div> */}

      {/* {projects.map((p) => (
        <div
          key={p.id}
          style={{
            padding: "7px 20px",
            fontSize: 13,
            color: "#6b6965",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 9,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f3ed")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <div
            style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, flexShrink: 0 }}
          />
          {p.name}
        </div>
      ))} */}

      {/* User profile at bottom */}
      <div
        style={{
          marginTop: "auto",
          padding: "14px 20px 0",
          borderTop: "0.5px solid #e2dfd8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
          <Avatar initials={user?.initials ?? "SK"} bg="#9FE1CB" color="#085041" size={30} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#1a1917" }}>
              {user?.name ?? "Soham K."}
            </div>
            <div style={{ fontSize: 11, color: "#a8a59e" }}>{user?.role ?? "Admin"}</div>
          </div>
        </div>
      </div>
    </nav>
  );
}