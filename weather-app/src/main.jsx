import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WeatherOpenMeteo from "./assets/components/pages/weather-openmateo";
import WeatherOpenMap from "./assets/components/pages/weather-openweathermap";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WeatherOpenMeteo />,
  },
  {
    path: "/weather-openweathermap",
    element: <WeatherOpenMap />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
