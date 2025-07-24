import { useState, type MouseEvent as ReactMouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { baseUrl } from "@/main";

type User = {
  name: string;
  email: string;
  avatar?: string;
  role: string;
};

export default function NavbarLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userString = localStorage.getItem("user");
  const user: User = userString ? JSON.parse(userString) : null;
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  const logout = async (e: ReactMouseEvent<HTMLButtonElement>) => {
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
        navigate("/");
      } else {
        console.warn("Logout failed", await res.text());
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          📘 MyCMS
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <a href="#posts" className="hover:text-blue-600">
            Posts
          </a>
          <a href="#about" className="hover:text-blue-600">
            About
          </a>
          <a href="#contact" className="hover:text-blue-600">
            Contact
          </a>

          {!isLoggedIn ? (
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition shadow-sm">
              Login
            </Link>
          ) : (
            <div className="relative bg-blue-200 px-2 py-2 rounded-lg">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">{getInitial(user?.name || "")}</div>
                )}
                <span className="hidden md:inline text-blue-600">{user?.name}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                  <div className="px-4 py-2 font-semibold text-sm border-b border-gray-200">Hi, {user?.name}</div>
                  {user.role !== "member" && (
                    <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 text-sm" onClick={() => setDropdownOpen(false)}>
                      Dashboard
                    </Link>
                  )}
                  <button onClick={logout} className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-500 hover:bg-red-100 transition-colors duration-150 text-sm">
                    <Icon icon="mdi:logout" width="20" height="20" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700 hover:text-blue-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <Link to="/" className="block hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <a href="#posts" className="block hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
            Posts
          </a>
          <a href="#about" className="block hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
            About
          </a>
          <a href="#contact" className="block hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>
            Contact
          </a>

          <hr className="border-gray-200" />

          {!isLoggedIn ? (
            <Link to="/login" className="block bg-blue-600 text-white text-center px-4 py-2 rounded-md hover:bg-blue-700" onClick={() => setMobileMenuOpen(false)}>
              Login
            </Link>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">{getInitial(user?.name || "")}</div>
                )}
                <span className="font-semibold">{user?.name}</span>
              </div>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block hover:text-blue-600">
                Profil
              </Link>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block hover:text-blue-600">
                Dashboard
              </Link>
              <button onClick={logout} className="text-red-600 hover:underline">
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
