import React from 'react';
import { MapPin, Cloud, Home, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  currentPage: 'landing' | 'dashboard' | 'result';
  onBack?: () => void;
  cityName?: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onBack, cityName }) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case 'landing':
        return 'Weather Explorer';
      case 'dashboard':
        return cityName ? `Weather in ${cityName}` : 'Weather Dashboard';
      case 'result':
        return 'Search Results';
      default:
        return 'Weather Explorer';
    }
  };

  const getPageIcon = () => {
    switch (currentPage) {
      case 'landing':
        return <Home className="w-5 h-5" />;
      case 'dashboard':
        return <Cloud className="w-5 h-5" />;
      case 'result':
        return <MapPin className="w-5 h-5" />;
      default:
        return <Home className="w-5 h-5" />;
    }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200 dark:bg-gray-800/90 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                Weather Explorer
              </span>
            </div>
          </div>

          {/* Center - Current page info */}
          <div className="hidden md:flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              {getPageIcon()}
              <span className="font-medium">{getPageTitle()}</span>
            </div>
          </div>

          {/* Right side - Back button and actions */}
          <div className="flex items-center space-x-3">
            {currentPage !== 'landing' && onBack && (
              <Button
                onClick={onBack}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 bg-white hover:bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 mr-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}
            
            {/* Page indicator for mobile */}
            <div className="md:hidden flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              {getPageIcon()}
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {currentPage === 'landing' ? 'Home' : currentPage === 'dashboard' ? 'Weather' : 'Results'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
