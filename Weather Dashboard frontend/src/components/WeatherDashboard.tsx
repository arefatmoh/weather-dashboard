import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import WeatherCard from './WeatherCard';
import WeeklyForecast from './WeeklyForecast';

// Define the weather data structure
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

interface WeatherDashboardProps {
  weather: WeatherData;
  weeklyForecast?: Array<{
    date: string;
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    description: string;
  }>;
  onSearch: (city: string) => void;
  onBack: () => void;
  onRefresh?: () => void; // Add refresh functionality
}

const WeatherDashboard = ({ weather, weeklyForecast, onSearch, onBack, onRefresh }: WeatherDashboardProps) => {
  // State to store the search input
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  // Auto-refresh weather data every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (onRefresh) {
        onRefresh();
        setLastUpdated(new Date());
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [onRefresh]);

  // Function to handle search button click
  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  // Function to handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Search bar section */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg p-6 mt-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="flex-1 flex gap-3">
            <div className="relative flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search another city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full h-14 pl-5 pr-14 bg-white border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
              />
              <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            
            <Button 
              onClick={handleSearch}
              className="h-14 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={!searchQuery.trim()}
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Weather content with improved spacing */}
      <div className="max-w-6xl mx-auto p-6 pt-8">
        <div className="flex justify-center">
          <WeatherCard weather={weather} />
        </div>
        
        {/* Weekly Forecast */}
        {weeklyForecast && weeklyForecast.length > 0 && (
          <div className="mt-12">
            <WeeklyForecast forecast={weeklyForecast} />
          </div>
        )}
        
        {/* Additional info section with refresh functionality */}
        <div className="mt-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-gray-600 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Weather data updates automatically every 5 minutes</span>
          </div>
          
          {/* Manual refresh button and last updated info */}
          <div className="flex flex-col items-center gap-3">
            <Button 
              onClick={onRefresh}
              variant="outline"
              className="bg-white/80 hover:bg-white border-blue-200 text-blue-600 hover:text-blue-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Now
            </Button>
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;