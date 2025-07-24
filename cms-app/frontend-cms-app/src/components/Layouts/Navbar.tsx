import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect, type FC, type MouseEvent as ReactMouseEvent } from "react";
import { baseUrl } from "@/main";

type NavbarProps = {
  onToggleSidebar: () => void;
  title: string;
  nameUser: string;
  sidebarOpen: boolean;
};
type User = {
  name: string;
  email: string;
  avatar?: string;
};

const Navbar: FC<NavbarProps> = ({ onToggleSidebar, title, nameUser, sidebarOpen }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userString = localStorage.getItem("user");
  const user: User = userString ? JSON.parse(userString) : null;
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = async (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const urlBase = baseUrl;

    try {
      const res = await fetch(`${urlBase}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.warn("Logout failed", await res.text());
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && e.target instanceof Node && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isMobile = window.innerWidth < 768;
  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <nav className="px-6 py-3 shadow-2xl flex justify-between items-center border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        {!isMobile && (
          <button onClick={onToggleSidebar} className="text-gray-500 focus:outline-none">
            {sidebarOpen ? <Icon icon="mdi:menu-open" width="28" height="28" /> : <Icon icon="mdi:menu-close" width="28" height="28" />}
          </button>
        )}
        <h1 className="text-xl font-bold text-gray-700">{title}</h1>
      </div>
      <div className="relative bg-blue-200 px-2 py-2 rounded-lg" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="focus:outline-none">
          <div className="flex items-center space-x-3">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">{getInitial(user?.name || "")}</div>
            )}
            <span className="font-semibold text-blue-600">{user?.name}</span>
          </div>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-slate-700 rounded-lg py-2 z-50 shadow-lg border border-slate-200">
            <div className="px-4 py-2 font-semibold text-sm border-b border-slate-200">Hi, {nameUser}</div>
            <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-500 hover:bg-red-100 transition-colors duration-150 text-sm">
              <Icon icon="mdi:logout" width="20" height="20" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
