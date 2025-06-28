import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";
import type { FC } from "react";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    const current = location.pathname;
    if (current === path) return true;
    return current.startsWith(`${path}/`) && path !== "/dashboard";
  };

  const linkClass = (path: string): string => `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600 font-medium ${isActive(path) ? "bg-blue-500 text-white" : "text-slate-700 hover:text-white"}`;

  const isMobile = window.innerWidth < 768;

  return (
    <aside className={`${isOpen ? "w-64" : "w-20"} transition-all duration-300 border-r-gray-200 border-r h-screen p-4 flex flex-col`}>
      <div className="flex flex-col items-center justify-center mb-8">
        <img src="/id.png" alt="Logo" width={isOpen ? 72 : 64} />
        {isOpen && <span className="text-center font-bold">AROBIDSH ID</span>}
      </div>
      <ul className="space-y-4">
        {[
          {
            to: "/dashboard",
            icon: "mdi:account-multiple",
            label: "Dashboard",
          },
          {
            to: "/dashboard/users",
            icon: "mdi:account-multiple",
            label: "Users Management",
          },
        ].map(({ to, icon, label }) => (
          <li key={to} className="relative group">
            <Link to={to} className={linkClass(to)} onClick={() => isMobile && onClose()}>
              <Icon icon={icon} width="20" />
              {isOpen && <span>{label}</span>}
            </Link>
            {!isOpen && (
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">{label}</div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
