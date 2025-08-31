import React from 'react';
import { Card, CardContent } from './ui/card';

interface DailyForecast {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  description: string;
}

interface WeeklyForecastProps {
  forecast: DailyForecast[];
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl border-0">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          7-Day Forecast
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {forecast.map((day, index) => (
            <div
              key={index}
              className="text-center p-4 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-blue-100 dark:border-gray-600"
            >
              <p className="font-semibold text-gray-800 dark:text-white mb-2">
                {day.day}
              </p>
                             <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">
                 {day.date}
               </p>
               
               <div className="flex justify-center mb-3">
                 <img
                   src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                   alt={day.description}
                   className="w-12 h-12"
                 />
               </div>
               
               <p className="text-xs text-gray-700 dark:text-gray-200 mb-2 capitalize">
                 {day.description}
               </p>
              
              <div className="space-y-1">
                <p className="text-lg font-bold text-red-600 dark:text-red-400">
                  {day.high}°
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {day.low}°
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyForecast;
