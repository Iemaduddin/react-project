import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Pages/login.jsx";
import RegisterPage from "./components/Pages/register.jsx";
import ErrorPage from "./components/Pages/403.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import DashboardPage from "./components/Pages/dashboard.jsx";
import UsersManagementPage from "./components/Pages/users-management.jsx";
import NewsManagement from "./components/Pages/news/news-management.jsx";
import PostDetailPage from "./components/Pages/news/detail.jsx";
import AlbumPage from "./components/Pages/albums/index.jsx";

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
  {
    path: "/dashboard/news",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <NewsManagement />,
      },
    ],
  },
  {
    path: "/dashboard/news/:id",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <PostDetailPage />,
      },
    ],
  },
  {
    path: "/dashboard/albums",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <AlbumPage />,
      },
    ],
  },
  // {
  //   path: "/dashboard/albums/:id",
  //   element: <ProtectedRoute />,
  //   children: [
  //     {
  //       index: true,
  //       element: <AlbumPage />,
  //     },
  //   ],
  // },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
