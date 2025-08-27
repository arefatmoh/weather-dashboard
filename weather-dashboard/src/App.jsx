import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { fetchWeather } from "./services/weatherService";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    setError("");
    setLoading(true);
    const data = await fetchWeather(city);
    setLoading(false);

    if (data) {
      setWeather(data);
    } else {
      setWeather(null);
      setError("City not found. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-white mb-6">🌤️ Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />

      {loading && <p className="text-white mt-4 animate-pulse">Loading...</p>}
      {error && <p className="text-red-200 mt-4">{error}</p>}
      {weather && !loading && <WeatherCard data={weather} />}
    </div>
  );
}

export default App;
