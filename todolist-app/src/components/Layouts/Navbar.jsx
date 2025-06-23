import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";
const Navbar = ({ onToggleSidebar, title }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-bl from-blue-700 to-blue-400 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <div className="flex items-center gap-3">
        {!isMobile && (
          <button onClick={onToggleSidebar} className="text-white focus:outline-none">
            <Icon icon="mdi:menu" width="28" height="28" />
          </button>
        )}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="focus:outline-none">
          <img src="https://i.pravatar.cc/40" alt="Profile" className="w-10 h-10 rounded-full border-2 border-white" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-slate-700 rounded-lg py-2 z-50">
            <a href="#" className="block px-4 py-2 hover:bg-blue-100">
              My Profile
            </a>
            <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-500 hover:bg-red-100 transition-colors duration-150">
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
