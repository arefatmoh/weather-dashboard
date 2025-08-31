export async function fetchWeather(city: string) {
  try {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    
    if (!apiKey) {
      throw new Error("API key not found. Please check your .env file.");
    }
    
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!res.ok) throw new Error("City not found");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function fetchForecast(city: string) {
  try {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    
    if (!apiKey) {
      throw new Error("API key not found. Please check your .env file.");
    }
    
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!res.ok) throw new Error("Forecast not available");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// New function to get 7-day forecast
export async function fetchWeeklyForecast(city: string) {
  try {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    
    if (!apiKey) {
      throw new Error("API key not found. Please check your .env file.");
    }
    
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&cnt=56`
    );
    if (!res.ok) throw new Error("Weekly forecast not available");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
