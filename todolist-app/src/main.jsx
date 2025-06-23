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
import ToDoListsPage from "./components/Pages/todolists.jsx";

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
    path: "/dashboard/to-do-lists",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <ToDoListsPage />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
