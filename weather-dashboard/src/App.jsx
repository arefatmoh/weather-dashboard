import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import { fetchWeather, fetchForecast } from "./services/weatherService";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    setError("");
    setLoading(true);

    const data = await fetchWeather(city);
    const forecastData = await fetchForecast(city);
    setLoading(false);

    if (data && forecastData) {
      setWeather(data);

      // take one forecast per day (midday)
      const daily = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      ).map((item) => ({
        date: new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" }),
        temp: Math.round(item.main.temp),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      }));

      setForecast(daily);
    } else {
      setWeather(null);
      setForecast([]);
      setError("City not found. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-white dark:text-yellow-300 mb-6">🌤️ Weather Dashboard</h1>
      <ThemeToggle />
      <SearchBar onSearch={handleSearch} />

      {loading && <p className="text-white mt-4 animate-pulse">Loading...</p>}
      {error && <p className="text-red-200 mt-4">{error}</p>}
      {weather && !loading && (
        <>
          <WeatherCard data={weather} />
          <div className="mt-6 flex gap-4 overflow-x-auto w-full justify-center">
            {forecast.map((f, index) => (
              <ForecastCard key={index} forecast={f} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
