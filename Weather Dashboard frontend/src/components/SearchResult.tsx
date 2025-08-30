import React, { useState } from 'react';
import { Search, ArrowLeft, AlertCircle, MapPin, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import WeatherCard from './WeatherCard';

// Define the weather data structure (matching other components)
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

interface SearchResultProps {
  weather: WeatherData | null;
  error: string | null;
  onSearch: (city: string) => void;
  onBack: () => void;
}

const SearchResult = ({ weather, error, onSearch, onBack }: SearchResultProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

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

      {/* Content with improved spacing */}
      <div className="max-w-6xl mx-auto p-6 pt-16">
        <div className="flex justify-center">
          {weather && <WeatherCard weather={weather} />}
          
          {error && (
            <Card className="w-full max-w-lg mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border-0">
              <CardContent className="p-10 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-orange-100 rounded-full">
                    <AlertCircle className="w-16 h-16 text-orange-500" />
                  </div>
                </div>
                <h2 className="text-3xl mb-4 text-gray-800 font-bold">City Not Found</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We couldn't find weather information for that city. 
                  Please check the spelling and try again with a different city name.
                </p>
                
                {/* Helpful suggestions */}
                <div className="mb-8 p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-800 mb-2 font-medium">💡 Try these cities instead:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['London', 'Tokyo', 'New York', 'Paris', 'Sydney'].map((city) => (
                      <Button
                        key={city}
                        variant="outline"
                        size="sm"
                        onClick={() => onSearch(city)}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        {city}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={onBack}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Try Another Search
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;