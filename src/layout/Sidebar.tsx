import { Home } from "lucide-react";
import { useState } from "react";
import SidebarItem from "../components/layout/SidebarItem";

const navItems = [
  { name: "Dashboard", icon: <Home size={20} />, href: "/" },
];

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");

  return (
    <aside className="h-screen w-24 bg-white border-r flex flex-col items-center py-6 space-y-6 shadow-lg">
      {navItems.map((item) => (
        <SidebarItem
          key={item.name}
          name={item.name}
          icon={item.icon}
          active={active === item.name}
          onClick={() => setActive(item.name)}
        />
      ))}
    </aside>
  );
};

export default Sidebar;
