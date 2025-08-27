function WeatherCard({ data }) {
  return (
    <div className="mt-6 bg-white rounded-2xl shadow-xl p-6 text-center max-w-sm w-full">
      <h2 className="text-2xl font-semibold">{data.name}</h2>
      <p className="capitalize text-gray-600">{data.weather[0].description}</p>
      <p className="text-4xl font-bold mt-2">{Math.round(data.main.temp)}°C</p>

      <div className="flex justify-between mt-4 text-sm text-gray-700">
        <p>💧 Humidity: {data.main.humidity}%</p>
        <p>🌬️ Wind: {data.wind.speed} m/s</p>
      </div>

      <p className="mt-2 text-gray-500">Feels like {Math.round(data.main.feels_like)}°C</p>
    </div>
  );
}

export default WeatherCard;
