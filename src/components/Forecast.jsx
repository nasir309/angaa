function Forecast({ forecast, temperatureUnit }) {
  // Group forecast by day and get one entry per day
  const dailyForecast = [];
  const processedDays = new Set();

  forecast.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toDateString();
    
    if (!processedDays.has(dayKey) && dailyForecast.length < 5) {
      dailyForecast.push(item);
      processedDays.add(dayKey);
    }
  });

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {dailyForecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-day">
              {getDayName(day.dt)}
            </div>
            <img 
              src={getWeatherIcon(day.weather[0].icon)} 
              alt={day.weather[0].description}
              className="forecast-icon"
            />
            <div className="forecast-temps">
              <span className="temp-high">
                {Math.round(day.main.temp_max)}°
              </span>
              <span className="temp-low">
                {Math.round(day.main.temp_min)}°
              </span>
            </div>
            <div className="forecast-condition">
              {day.weather[0].main}
            </div>
            <div className="forecast-details">
              <div className="forecast-humidity">
                💧 {day.main.humidity}%
              </div>
              <div className="forecast-wind">
                🌪️ {day.wind.speed} {temperatureUnit === 'metric' ? 'm/s' : 'mph'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;