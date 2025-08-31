import React, { useState } from 'react';
import { Search, MapPin, Cloud, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { getCurrentLocation } from '../services/geolocationService';

interface LandingPageProps {
  onSearch: (city: string) => void;
  loading?: boolean;
  recentSearches?: string[];
}

const LandingPage = ({ onSearch, loading = false, recentSearches = [] }: LandingPageProps) => {
  // State to store what the user types in the search box
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle the search button click
  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  // Function to handle when user presses Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Function to get user's current location
  const handleGetLocation = async () => {
    try {
      const location = await getCurrentLocation();
      onSearch(location.city);
    } catch (error) {
      console.error('Location error:', error);
      // You could show a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4 pt-20">
      {/* Header section with weather-themed icons */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center mb-6">
          <Cloud className="w-16 h-16 text-blue-500 dark:text-blue-400 mr-4" />
          <MapPin className="w-16 h-16 text-indigo-500 dark:text-indigo-400" />
        </div>
        <h1 className="text-4xl md:text-6xl mb-6 text-gray-800 dark:text-white font-bold">
          Weather Explorer
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md">
          Discover the weather in any city around the world. Get real-time updates and detailed information.
        </p>
      </div>
      
              {/* Search section */}
        <div className="w-full max-w-lg space-y-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter city name (e.g., London, Tokyo, New York)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full h-16 pl-6 pr-16 text-lg bg-white shadow-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
            />
            <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-blue-400" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={handleSearch}
              className="h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={!searchQuery.trim() || loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Searching...
                </div>
              ) : (
                'Search Weather'
              )}
            </Button>
            
            <Button 
              onClick={handleGetLocation}
              variant="outline"
              className="h-16 bg-white hover:bg-gray-50 border-2 border-green-200 hover:border-green-300 text-green-600 hover:text-green-700 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Navigation className="w-5 h-5 mr-2" />
              My Location
            </Button>
          </div>
        </div>
      
              {/* Recent searches section */}
        {recentSearches.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600 mb-3">Recent searches:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {recentSearches.map((city) => (
                <Button
                  key={city}
                  variant="outline"
                  size="sm"
                  onClick={() => onSearch(city)}
                  className="text-blue-600 border-blue-200 hover:bg-blue-50 text-sm px-3 py-1"
                >
                  {city}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Footer with some helpful tips */}
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            💡 Try searching for cities like "Paris", "Sydney", or "Rio de Janeiro"
          </p>
        </div>
    </div>
  );
};

export default LandingPage;