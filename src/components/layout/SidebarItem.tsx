// SidebarItem.tsx
import { ReactNode } from "react";

interface SidebarItemProps {
  name: string;
  icon: ReactNode;
  active: boolean;
  onClick: () => void;
}

const SidebarItem = ({ name, icon, active, onClick }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 w-16
        ${active
          ? "bg-brand text-white shadow-md scale-105"
          : "text-neutral-500 hover:text-brand hover:bg-neutral-100"}
      `}
    >
      {icon}
      <span className="text-[10px] mt-1 font-medium">{name}</span>
    </button>
  );
};

export default SidebarItem;