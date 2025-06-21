import { useEffect, useState } from "react";
import Footbar from "./Footbar";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const authName = localStorage.getItem("user").name || "";

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1">
        <Navbar onToggleSidebar={toggleSidebar} title={title} nameUser={authName} />
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">{children}</main>
        <Footbar />
      </div>
    </div>
  );
};

export default DashboardLayout;
