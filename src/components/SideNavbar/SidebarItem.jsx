import React, { useState } from "react";
import { Icon } from "../ui/DashboardPrimitives";
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ item }) => {
  const [open, setOpen] = useState(item.label === "Threads"); // Open by default for Threads
  const navigate = useNavigate();

  const handleClick = () => {
    if (item.children) {
      setOpen(!open); // toggle dropdown
    } else {
      navigate(item.path);
    }
  };

  return (
    <div>
      {/* Main Item */}
      <div
        className="nav-button"
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          padding: "10px"
        }}
      >
        <Icon type={item.icon} />
        <span>{item.label}</span>
      </div>

      {/* Submenu */}
      {item.children && open && (
        <div style={{ paddingLeft: "30px" }}>
          {item.children.map((sub, index) => (
            <div
              key={index}
              onClick={() => navigate(sub.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 0",
                cursor: "pointer",
                fontSize: "14px",
                color: "#555"
              }}
            >
              <Icon type="thread" size="small" />
              <span>{sub.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;