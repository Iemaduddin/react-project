import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const isActive = (path) => {
    const current = location.pathname;

    if (current === path) return true;

    const isDetail = current.startsWith(`${path}/`);
    return isDetail && path !== "/dashboard";
  };

  const linkClass = (path) => `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-200 font-medium ${isActive(path) ? "bg-blue-300 text-blue-800" : "text-slate-700"}`;
  const isMobile = window.innerWidth < 768;

  return (
    <aside className={`${isOpen ? "w-64" : "w-20"} transition-all duration-300 bg-blue-100 h-screen p-4 flex flex-col`}>
      <div className="flex flex-col items-center justify-center mb-8">
        <img src="/id.png" alt="Logo" width={`${isOpen ? 72 : 64}`} />
        {isOpen && <span className="text-center font-bold">AROBIDSH ID</span>}
      </div>
      <ul className="space-y-4">
        <li className="relative group">
          <Link to="/dashboard" className={linkClass("/dashboard")} onClick={() => isMobile && onClose()}>
            <Icon icon="mdi:account-multiple" width="20" />
            {isOpen && <span>Dashboard</span>}
          </Link>
          {!isOpen && (
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">Dashboard</div>
          )}
        </li>
        <li className="relative group">
          <Link to={"/dashboard/users"} className={linkClass("/dashboard/users")} onClick={() => isMobile && onClose()}>
            <Icon icon="mdi:account-multiple" width="20" />
            {isOpen && <span>Users Management</span>}
          </Link>
          {!isOpen && (
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Users Management
            </div>
          )}
        </li>
        <li className="relative group">
          <Link to={"/dashboard/news"} className={linkClass("/dashboard/news")} onClick={() => isMobile && onClose()}>
            <Icon icon="mdi:newspaper-variant-multiple" width="20" />
            {isOpen && <span>News Management</span>}
          </Link>
          {!isOpen && (
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              News Management
            </div>
          )}
        </li>
        <li className="relative group">
          <Link to={"/dashboard/albums"} className={linkClass("/dashboard/albums")} onClick={() => isMobile && onClose()}>
            <Icon icon="mdi:image-multiple" width="20" />
            {isOpen && <span>Albums</span>}
          </Link>
          {!isOpen && (
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">Albums</div>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
