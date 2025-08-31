import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import WeatherDashboard from './components/WeatherDashboard';
import SearchResult from './components/SearchResult';
import { fetchWeather, fetchForecast, fetchWeeklyForecast } from './services/weatherService';
import ThemeToggle from './components/ThemeToggle';
import Navigation from './components/Navigation';

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

interface WeeklyForecastData {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  description: string;
}

// Different screens our app can show
type Screen = 'landing' | 'dashboard' | 'result';

export default function App() {
  // State management - these are the variables that control our app
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [weeklyForecast, setWeeklyForecast] = useState<WeeklyForecastData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    // Load recent searches from localStorage on app start
    const saved = localStorage.getItem('weather-recent-searches');
    return saved ? JSON.parse(saved) : [];
  });

  // Function to handle city search and fetch weather data
  const handleSearch = async (city: string) => {
    setLoading(true); // Show loading spinner
    setError(null);   // Clear any previous errors
    
    try {
      // Fetch current weather, forecast, and weekly forecast data
      const weatherData = await fetchWeather(city);
      const forecastData = await fetchForecast(city);
      const weeklyData = await fetchWeeklyForecast(city);
      
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
        
        // Transform weekly forecast data
        if (weeklyData) {
          const weekly: WeeklyForecastData[] = weeklyData.list
            .filter((item: any, index: number) => index % 8 === 0) // Get one forecast per day
            .slice(0, 7) // Get 7 days
            .map((item: any) => ({
              date: new Date(item.dt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
              high: Math.round(item.main.temp_max),
              low: Math.round(item.main.temp_min),
              condition: item.weather[0].main,
              icon: item.weather[0].icon,
              description: item.weather[0].description
            }));
          setWeeklyForecast(weekly);
        }
        
        setCurrentWeather(weather);
        setCurrentScreen('dashboard'); // Show the weather results
        
        // Save to recent searches
        const updatedSearches = [city, ...recentSearches.filter(s => s !== city)].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem('weather-recent-searches', JSON.stringify(updatedSearches));
      } else {
        setCurrentWeather(null);
        setWeeklyForecast([]);
        setError(`Weather data not available for "${city}"`);
        setCurrentScreen('result'); // Show error message
      }
    } catch (err) {
      setCurrentWeather(null);
      setWeeklyForecast([]);
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
      <ThemeToggle />
      <Navigation 
        currentPage={currentScreen}
        onBack={currentScreen !== 'landing' ? handleBack : undefined}
        cityName={currentWeather?.city}
      />
      
      {currentScreen === 'landing' && (
        <LandingPage 
          onSearch={handleSearch} 
          loading={loading} 
          recentSearches={recentSearches}
        />
      )}
      
      {currentScreen === 'dashboard' && currentWeather && (
        <WeatherDashboard 
          weather={currentWeather}
          weeklyForecast={weeklyForecast}
          onSearch={handleNewSearch}
          onBack={handleBack}
          onRefresh={() => handleSearch(currentWeather.city)}
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