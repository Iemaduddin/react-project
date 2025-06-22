import { useState } from "react";
import Navbar from "../Elements/Navbar";
import WeatherCardOpenMap from "../Elements/card/WeatherCardOpenMap";
import WeatherLayout from "../Layouts/WeatherLayout";

const WeatherOpenMap = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeather = async () => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      console.log(res);
      if (!res.ok) throw new Error("Kota tidak ditemukan");
      const data = await res.json();

      setWeather(data);
      setPending(true);
      setError("");
      setPending(false);
    } catch (error) {
      setWeather(null);
      setPending(true);
      setError(error.message);
      setPending(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <WeatherLayout title="Cuaca - API OPEN WEATHER MAP">
      <div className="min-h-screen bg-blue-100 flex items-center justify-center px-4">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="flex-1 border px-4 py-2 rounded-md border-gray-500" placeholder="Masukkan nama kota..." />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Cari
            </button>
          </form>
          {pending ? <p>Loading...</p> : error ? <p className="text-red-500">{error}</p> : weather && <WeatherCardOpenMap data={weather} />}
        </div>
      </div>
    </WeatherLayout>
  );
};

export default WeatherOpenMap;
