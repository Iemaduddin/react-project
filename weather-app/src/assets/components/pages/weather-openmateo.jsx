import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import WeatherLayout from "../Layouts/WeatherLayout";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from "@iconify/react";

// npm install --save react-apexcharts apexcharts
// npm install axios
// npm install react-router-dom
// npm install react-slick slick-carousel
// npm install @iconify/react
// npm install date-fns date-fns-tz

const WeatherOpenMeteo = () => {
  const [city, setCity] = useState("Surabaya");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ lat: -7.2575, lon: 112.7521 });
  const [initialSlideIndex, setInitialSlideIndex] = useState(0);

  // Fungsi untuk memformat tanggal dengan hari (lokal Asia/Jakarta)
  const formatDateWithDay = (dateStr) => {
    const date = new Date(dateStr + "T00:00:00Z");
    return new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const getWeatherData = async (lat, lon) => {
    try {
      setLoading(true);
      setError("");
      const today = new Date();
      const endDate = today.toISOString().split("T")[0];
      const yesterday = new Date(today.setDate(today.getDate() - 1));
      const startDate = new Date(yesterday.setDate(yesterday.getDate() - 28)).toISOString().split("T")[0];

      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Asia%2FBangkok`;

      const response = await axios.get(url);
      setWeatherData(response.data.daily);
    } catch (err) {
      setError("Gagal mengambil data cuaca: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (weatherData?.time) {
      const todayStr = new Date().toISOString().split("T")[0];
      const index = weatherData.time.findIndex((date) => date === todayStr);
      setInitialSlideIndex(index !== -1 ? index : weatherData.time.length - 1);
    }
  }, [weatherData]);

  // default ambil Surabaya
  useEffect(() => {
    getWeatherData(location.lat, location.lon);
  }, [location]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;

    try {
      const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
      const first = res.data.results?.[0];
      if (first) {
        setLocation({ lat: first.latitude, lon: first.longitude });
      } else {
        setError("Kota tidak ditemukan.");
      }
    } catch {
      setError("Gagal mencari lokasi.");
    }
  };

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

  const options = {
    chart: { type: "area", height: 350, toolbar: { show: false } },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    title: {
      text: `Suhu Harian ${city} (30 Hari Terakhir)`,
      align: "center",
    },
    xaxis: {
      categories: weatherData?.time,
      labels: { rotate: -45 },
    },
    yaxis: { title: { text: "Suhu (°C)" } },
    colors: ["#EF4444", "#3B82F6"],
    tooltip: { x: { format: "dd MMM" } },
  };

  const series = [
    {
      name: "Suhu Maksimum",
      data: weatherData?.temperature_2m_max || [],
    },
    {
      name: "Suhu Minimum",
      data: weatherData?.temperature_2m_min || [],
    },
  ];
  const PrevArrow = ({ className, onClick }) => (
    <button className={`${className} left-2 z-10`} onClick={onClick}>
      <Icon icon="mdi:chevron-left" className="text-3xl text-blue-500 hover:text-blue-700" />
    </button>
  );

  const NextArrow = ({ className, onClick }) => (
    <button className={`${className} right-2 z-10`} onClick={onClick}>
      <Icon icon="mdi:chevron-right" className="text-3xl text-blue-500 hover:text-blue-700" />
    </button>
  );

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: initialSlideIndex,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <WeatherLayout title="Cuaca - API OPEN METEO">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto">
        {/* Form Pencarian */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
          <input type="text" placeholder="Cari kota..." className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-blue-400" value={city} onChange={(e) => setCity(e.target.value)} />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full sm:w-auto">
            Cari
          </button>
        </form>

        {/* Error & Loading */}
        {error && <p className="text-red-500 text-center font-medium mb-4">{error}</p>}
        {loading ? (
          <p className="text-center">Loading data cuaca...</p>
        ) : (
          weatherData && (
            <>
              {/* Cuaca Harian (Slider) */}
              <div className="mb-6">
                <Slider {...sliderSettings} className="mb-6 relative">
                  {weatherData.time.map((date, index) => {
                    const formattedDate = formatDateWithDay(date);

                    const isLast = index === weatherData.time.length - 1;

                    return (
                      <div key={date} className="px-2">
                        <div
                          className={`p-4 rounded-lg shadow text-center h-full transition-all duration-300 
  ${isLast ? "bg-yellow-100 border border-yellow-400" : "bg-slate-100"}`}
                        >
                          <p className={`text-base font-semibold ${isLast ? "text-yellow-700" : "text-gray-700"}`}>{formattedDate}</p>
                          <p className="text-sm">🌡️ Max: {weatherData.temperature_2m_max[index]}°C</p>
                          <p className="text-sm">🧊 Min: {weatherData.temperature_2m_min[index]}°C</p>
                          <p className="text-4xl mt-1">{getWeatherIcon(weatherData.weathercode[index])}</p>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>

              {/* Grafik */}
              <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md">
                <Chart options={options} series={series} type="area" height={350} />
              </div>
            </>
          )
        )}
      </div>
    </WeatherLayout>
  );
};

export default WeatherOpenMeteo;
