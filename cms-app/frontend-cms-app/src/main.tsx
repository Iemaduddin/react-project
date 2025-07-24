import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";

import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import LoginPage from "./components/Pages/login.tsx";
import RegisterPage from "./components/Pages/register.tsx";
import SuperAdminDashboardPage from "./components/Pages/dashboard/superadmin.tsx";
import ErrorPage from "./components/Pages/403.tsx";
import UsersManagementPage from "./components/Pages/users-management.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import CategoryManagementPage from "./components/Pages/category-management.tsx";
import PostsManagementPage from "./components/Pages/posts-management.tsx";
import Home from "./components/Pages/landing/home.tsx";
import PostDetail from "./components/Pages/landing/post-detail.tsx";
import DashboardRouter from "./routes/DashboardRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
        element: <DashboardRouter />,
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
  {
    path: "/dashboard/categories",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <CategoryManagementPage />,
      },
    ],
  },
  {
    path: "/dashboard/posts",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <PostsManagementPage />,
      },
    ],
  },
  {
    path: "/posts/:slug",
    element: <PostDetail />,
  },
]);
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
export const baseUrl = "http://localhost:5000";

createRoot(rootElement).render(
  <StrictMode>
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  </StrictMode>
);
