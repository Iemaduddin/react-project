import { useEffect, useState, type ReactNode } from "react";
import Footbar from "./Footbar";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
  title: string;
};

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [authName, setAuthName] = useState<string>("");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }

    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setAuthName(user.name || "");
      }
    } catch (error) {
      console.log("gagal mengambil data", error);
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
