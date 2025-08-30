import React, { useState } from 'react';
import { Search, MapPin, Cloud } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface LandingPageProps {
  onSearch: (city: string) => void;
  loading?: boolean;
}

const LandingPage = ({ onSearch, loading = false }: LandingPageProps) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4">
      {/* Header section with weather-themed icons */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center mb-6">
          <Cloud className="w-16 h-16 text-blue-500 mr-4" />
          <MapPin className="w-16 h-16 text-indigo-500" />
        </div>
        <h1 className="text-4xl md:text-6xl mb-6 text-gray-800 font-bold">
          Weather Explorer
        </h1>
        <p className="text-xl text-gray-600 max-w-md">
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
        
        <Button 
          onClick={handleSearch}
          className="w-full h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
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
      </div>
      
      {/* Footer with some helpful tips */}
      <div className="mt-16 text-center text-gray-500">
        <p className="text-sm">
          💡 Try searching for cities like "Paris", "Sydney", or "Rio de Janeiro"
        </p>
      </div>
    </div>
  );
};

export default LandingPage;