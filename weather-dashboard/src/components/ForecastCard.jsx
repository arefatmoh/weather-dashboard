function ForecastCard({ forecast }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center w-28">
      <p className="font-semibold">{forecast.date}</p>
      <img
        src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
        alt={forecast.description}
        className="w-12 h-12"
      />
      <p className="text-sm capitalize">{forecast.description}</p>
      <p className="font-bold">{forecast.temp}°C</p>
    </div>
  );
}

export default ForecastCard;
