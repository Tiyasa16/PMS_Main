import { navItems } from "../../constants/navItems";

<div id="nav-content">
  {navItems.map((item, index) => (
    <SidebarItem key={index} item={item} />
  ))}
</div>