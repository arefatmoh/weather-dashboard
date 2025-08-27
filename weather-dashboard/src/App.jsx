import { useState } from "react";
import SearchBar from "./components/SearchBar";
import { fetchWeather } from "./services/weatherService";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (searchValue) => {
    setCity(searchValue);
    setError("");
    const data = await fetchWeather(searchValue);
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

      {error && <p className="text-red-200 mt-4">{error}</p>}

      {weather && (
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-semibold">{weather.name}</h2>
          <p className="text-lg">{weather.weather[0].description}</p>
          <p className="text-3xl font-bold">{Math.round(weather.main.temp)}°C</p>
        </div>
      )}
    </div>
  );
}

export default App;
