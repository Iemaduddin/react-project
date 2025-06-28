import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import LoginPage from "./components/Pages/login.tsx";
import RegisterPage from "./components/Pages/register.tsx";
import DashboardPage from "./components/Pages/dashboard.tsx";
import ErrorPage from "./components/Pages/403.tsx";
import UsersManagementPage from "./components/Pages/users-management.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "/dashboard/users",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <UsersManagementPage />,
      },
    ],
  },
]);
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
