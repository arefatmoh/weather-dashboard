import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, MapPin } from 'lucide-react';
import { Card, CardContent } from './ui/card';

// Define what weather data our card will display
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

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  // Function to display the appropriate weather icon
  const getWeatherIcon = (condition: string) => {
    // Use OpenWeatherMap icon if available, otherwise fallback to Lucide icons
    if (weather.icon) {
      return (
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
          className="w-16 h-16"
        />
      );
    }
    
    // Fallback to Lucide icons based on weather condition
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="w-16 h-16 text-yellow-500" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="w-16 h-16 text-blue-500" />;
      case 'clouds':
        return <Cloud className="w-16 h-16 text-gray-500" />;
      case 'snow':
        return <CloudRain className="w-16 h-16 text-blue-300" />;
      case 'thunderstorm':
        return <CloudRain className="w-16 h-16 text-purple-500" />;
      default:
        return <Sun className="w-16 h-16 text-yellow-500" />;
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-gradient-to-br from-white to-blue-50 shadow-2xl border-0">
      <CardContent className="p-8 text-center">
        {/* City name with location icon */}
        <div className="flex items-center justify-center mb-6">
          <MapPin className="w-5 h-5 text-blue-500 mr-2" />
          <h2 className="text-3xl font-bold text-gray-800">{weather.city}</h2>
        </div>
        
        {/* Weather icon */}
        <div className="flex justify-center mb-6">
          {getWeatherIcon(weather.condition)}
        </div>
        
        {/* Temperature display */}
        <div className="text-7xl font-bold mb-4 text-gray-800">
          {weather.temperature}°
        </div>
        
        {/* Weather description */}
        <p className="text-xl text-gray-700 dark:text-gray-200 mb-4 capitalize font-medium">
          {weather.description}
        </p>
        
        {/* Feels like temperature */}
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Feels like <span className="font-semibold text-gray-800 dark:text-gray-100">{weather.feelsLike}°</span>
        </p>
        
        {/* Weather details with icons */}
        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200 dark:border-gray-600">
          <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <Droplets className="w-8 h-8 text-blue-500 mb-2" />
            <span className="text-sm text-gray-700 dark:text-gray-200">Humidity</span>
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">{weather.humidity}%</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
            <Wind className="w-8 h-8 text-indigo-500 mb-2" />
            <span className="text-sm text-gray-700 dark:text-gray-200">Wind Speed</span>
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">{weather.windSpeed} mph</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;