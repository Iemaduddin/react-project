import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect, type FC, type MouseEvent as ReactMouseEvent } from "react";

type NavbarProps = {
  onToggleSidebar: () => void;
  title: string;
  nameUser: string;
};

const Navbar: FC<NavbarProps> = ({ onToggleSidebar, title, nameUser }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = async (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Logout button clicked");
    try {
      const res = await fetch("http://localhost:5000/logout", {
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

  return (
    <nav className="px-6 py-3 shadow-2xl flex justify-between items-center border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        {!isMobile && (
          <button onClick={onToggleSidebar} className="text-gray-500 focus:outline-none">
            <Icon icon="mdi:menu" width="28" height="28" />
          </button>
        )}
        <h1 className="text-xl font-bold text-gray-700">{title}</h1>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="focus:outline-none">
          <img src="https://i.pravatar.cc/40" alt="Profile" className="w-10 h-10 rounded-full border-2 border-white" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-slate-700 rounded-lg py-2 z-50 shadow-lg border border-slate-200">
            <div className="px-4 py-2 font-semibold text-sm border-b border-slate-200">Hi, {nameUser}</div>
            <a href="#" className="block px-4 py-2 hover:bg-blue-100 text-sm">
              My Profile
            </a>
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
