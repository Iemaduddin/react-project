import AdminDashboardPage from "@/components/Pages/dashboard/admin";
import AuthorDashboardPage from "@/components/Pages/dashboard/author";
import EditorDashboardPage from "@/components/Pages/dashboard/editor";
import SuperAdminDashboardPage from "@/components/Pages/dashboard/superadmin";

type User = {
  name: string;
  email: string;
  role: string;
};

const userString = localStorage.getItem("user");
const user: User | null = userString ? JSON.parse(userString) : null;

export default function DashboardRouter() {
  if (!user) return <p>Loading...</p>;

  switch (user.role) {
    case "superadmin":
      return <SuperAdminDashboardPage />;
    case "admin":
      return <AdminDashboardPage />;
    case "editor":
      return <EditorDashboardPage />;
    case "author":
      return <AuthorDashboardPage />;
    default:
      return <p>Role tidak dikenali</p>;
  }
}
