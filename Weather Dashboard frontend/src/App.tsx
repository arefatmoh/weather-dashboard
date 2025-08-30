import { useState } from 'react';
import LandingPage from './components/LandingPage';
import WeatherDashboard from './components/WeatherDashboard';
import SearchResult from './components/SearchResult';
import { fetchWeather, fetchForecast } from './services/weatherService';

// Define the structure of our weather data
interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  feelsLike: number;
}

// Different screens our app can show
type Screen = 'landing' | 'dashboard' | 'result';

export default function App() {
  // State management - these are the variables that control our app
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Function to handle city search and fetch weather data
  const handleSearch = async (city: string) => {
    setLoading(true); // Show loading spinner
    setError(null);   // Clear any previous errors
    
    try {
      // Fetch both current weather and forecast data
      const weatherData = await fetchWeather(city);
      const forecastData = await fetchForecast(city);
      
      if (weatherData && forecastData) {
        // Transform the API data into our app's format
        const weather: WeatherData = {
          city: weatherData.name,
          temperature: Math.round(weatherData.main.temp),
          condition: weatherData.weather[0].main,
          humidity: weatherData.main.humidity,
          windSpeed: Math.round(weatherData.wind.speed * 2.237), // Convert m/s to mph
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
          feelsLike: Math.round(weatherData.main.feels_like)
        };
        
        setCurrentWeather(weather);
        setCurrentScreen('dashboard'); // Show the weather results
      } else {
        setCurrentWeather(null);
        setError(`Weather data not available for "${city}"`);
        setCurrentScreen('result'); // Show error message
      }
    } catch (err) {
      setCurrentWeather(null);
      setError(`Error fetching weather data for "${city}"`);
      setCurrentScreen('result');
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // Function to go back to the landing page
  const handleBack = () => {
    setCurrentScreen('landing');
    setCurrentWeather(null);
    setError(null);
  };

  // Function to search for a new city from the dashboard
  const handleNewSearch = async (city: string) => {
    await handleSearch(city);
  };

  return (
    <div className="size-full">
      {currentScreen === 'landing' && (
        <LandingPage onSearch={handleSearch} loading={loading} />
      )}
      
      {currentScreen === 'dashboard' && currentWeather && (
        <WeatherDashboard 
          weather={currentWeather}
          onSearch={handleNewSearch}
          onBack={handleBack}
        />
      )}
      
      {currentScreen === 'result' && (
        <SearchResult 
          weather={currentWeather}
          error={error}
          onSearch={handleNewSearch}
          onBack={handleBack}
        />
      )}
    </div>
  );
}