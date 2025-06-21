const WeatherCard = ({ data }) => {
  return (
    <div className="max-w-sm mx-auto bg-gradient-to-br from-blue-400 to-purple-600 text-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center">
        {data.name}, {data.sys.country}
      </h2>
      <div className="flex items-center justify-center mb-4">
        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} alt={data.weather[0].description} className="w-24 h-24" />
      </div>
      <p className="text-center text-4xl font-semibold mb-1">{Math.round(data.main.temp)}°C</p>
      <p className="text-center capitalize">{data.weather[0].description}</p>
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div className="text-center">
          <p className="font-semibold">Feels Like</p>
          <p>{Math.round(data.main.feels_like)}°C</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">Humidity</p>
          <p>{data.main.humidity}%</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">Wind</p>
          <p>{data.wind.speed} m/s</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">Pressure</p>
          <p>{data.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
