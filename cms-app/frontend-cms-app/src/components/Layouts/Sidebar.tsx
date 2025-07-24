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
  const userRole = JSON.parse(localStorage.getItem("user") || "{}")?.role;

  const menuItems = [
    {
      to: "/dashboard",
      icon: "mdi:view-dashboard-outline",
      label: "Dashboard",
    },
    {
      to: "/dashboard/users",
      icon: "mdi:account-multiple",
      label: "Users Management",
      roles: ["superadmin"],
    },
    {
      to: "/dashboard/categories",
      icon: "mdi:category-outline",
      label: "Categories Management",
      roles: ["superadmin", "admin"],
    },
    {
      to: "/dashboard/posts",
      icon: "mdi:post-outline",
      label: "Posts Management",
    },
  ];
  return (
    <aside className={`${isOpen ? "w-72" : "w-20"} transition-all duration-300 border-r border-r-gray-200 h-screen p-4 flex flex-col`}>
      <div className={`flex items-center justify-${isOpen ? "start" : "center"} mb-4 gap-3 px-2`}>
        <img src="/id.png" alt="Logo" width={isOpen ? 36 : 48} />
        {isOpen && <span className="text-lg font-bold whitespace-nowrap">AROBIDSH ID</span>}
      </div>

      <hr className="border-t border-gray-300 mb-4 w-full" />

      {isOpen && <h4 className="text-sm font-bold text-gray-500 mb-2 px-2">Pages</h4>}

      <ul className="space-y-4">
        {menuItems
          .filter((item) => {
            if (item.roles) {
              return item.roles.includes(userRole);
            }
            return true;
          })
          .map(({ to, icon, label }) => (
            <li key={to} className="relative group">
              <Link to={to} className={linkClass(to)} onClick={() => isMobile && onClose()}>
                <Icon icon={icon} width="20" />
                {isOpen && <span className="ml-2">{label}</span>}
              </Link>
              {!isOpen && (
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  {label}
                </div>
              )}
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
