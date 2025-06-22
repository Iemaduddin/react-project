import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const WeatherCardOpenMeteo = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const today = new Date();
    const endDate = today.toISOString().split("T")[0];
    const startDate = new Date(today.setDate(today.getDate() - 29)).toISOString().split("T")[0];

    const latitude = -7.2575; // Surabaya
    const longitude = 112.7521;

    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Asia%2FBangkok`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data cuaca");
        return res.json();
      })
      .then((data) => {
        setWeatherData(data.daily);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!weatherData) return <p className="text-center">Loading data cuaca...</p>;

  const options = {
    chart: {
      type: "area",
      height: 350,
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    title: {
      text: "Suhu Harian Surabaya (30 Hari Terakhir)",
      align: "center",
    },
    xaxis: {
      categories: weatherData.time,
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: { text: "Suhu (°C)" },
    },
    colors: ["#EF4444", "#3B82F6"],
    tooltip: {
      x: { format: "dd MMM" },
    },
  };

  const series = [
    {
      name: "Suhu Maksimum",
      data: weatherData.temperature_2m_max,
    },
    {
      name: "Suhu Minimum",
      data: weatherData.temperature_2m_min,
    },
  ];
  const weatherIcons = {
    0: "☀️",
    1: "🌤",
    2: "⛅",
    3: "☁️",
    45: "🌫",
    51: "🌦",
    61: "🌧",
    80: "🌧",
    95: "⛈",
    96: "🌩",
  };

  const getWeatherIcon = (code) => weatherIcons[code] || "❓";
  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md space-y-4">
      {/* List cuaca harian */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {weatherData.time.map((date, index) => (
          <div key={date} className="bg-slate-100 p-4 rounded-md shadow">
            <p className="text-lg font-semibold">{date}</p>
            <p>🌡️ Max: {weatherData.temperature_2m_max[index]}°C</p>
            <p>🧊 Min: {weatherData.temperature_2m_min[index]}°C</p>
            <p className="text-3xl">{getWeatherIcon(weatherData.weathercode[index])}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default WeatherCardOpenMeteo;
