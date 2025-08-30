import React, { useState } from 'react';
import { Search, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import WeatherCard from './WeatherCard';

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
  onSearch: (city: string) => void;
  onBack: () => void;
}

const WeatherDashboard = ({ weather, onSearch, onBack }: WeatherDashboardProps) => {
  // State to store the search input
  const [searchQuery, setSearchQuery] = useState('');

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
      {/* Header with search bar */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg p-6">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="md:hidden hover:bg-blue-50 rounded-full p-2"
          >
            <ArrowLeft className="w-5 h-5 text-blue-600" />
          </Button>
          
          <div className="flex-1 flex gap-3">
            <div className="relative flex-1">
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
      <div className="max-w-6xl mx-auto p-6 pt-16">
        <div className="flex justify-center">
          <WeatherCard weather={weather} />
        </div>
        
        {/* Additional info section */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-gray-600 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Weather data updates in real-time</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;