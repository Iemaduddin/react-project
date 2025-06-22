import { Link, useLocation } from "react-router-dom";

const Navbar = ({ title }) => {
  const location = useLocation();

  const navLinkClass = (path) => `hover:text-yellow-300 transition duration-200 ${location.pathname === path ? "font-bold underline underline-offset-4" : ""}`;

  return (
    <nav className="bg-gradient-to-bl from-blue-700 to-blue-500 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-xl font-bold">{title}</h1>

        {/* Navigation Links */}
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/" className={navLinkClass("/")}>
            API OPEN METEO
          </Link>
          <Link to="/weather-openweathermap" className={navLinkClass("/weather-openweathermap")}>
            API OPEN WEATHER MAP
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
