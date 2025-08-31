// Service to handle geolocation functionality
export interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

// Get user's current location using browser Geolocation API
export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocoding to get city name
          const city = await getCityFromCoordinates(latitude, longitude);
          
          resolve({
            latitude,
            longitude,
            city,
            country: 'Unknown' // Could be enhanced with country detection
          });
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('Location access denied. Please enable location services.'));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Location information unavailable.'));
            break;
          case error.TIMEOUT:
            reject(new Error('Location request timed out.'));
            break;
          default:
            reject(new Error('An unknown error occurred while getting location.'));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000 // 10 minutes
      }
    );
  });
};

// Reverse geocoding to get city name from coordinates
const getCityFromCoordinates = async (lat: number, lon: number): Promise<string> => {
  try {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to get city name');
    }
    
    const data = await response.json();
    return data[0]?.name || 'Unknown City';
  } catch (error) {
    console.error('Error getting city name:', error);
    return 'Unknown City';
  }
};
