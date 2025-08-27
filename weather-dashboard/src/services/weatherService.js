export async function fetchWeather(city) {
  try {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
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

export async function fetchForecast(city) {
  try {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
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
