import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sunrise, 
  Sunset,
  MapPin
} from 'lucide-react';

function WeatherCard({ weather, temperatureUnit }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const getFeelsLikeText = (temp, feelsLike) => {
    const diff = Math.abs(temp - feelsLike);
    if (diff < 2) return "Feels like the actual temperature";
    if (feelsLike > temp) return `Feels ${diff.toFixed(1)}° warmer`;
    return `Feels ${diff.toFixed(1)}° cooler`;
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location">
          <MapPin size={20} />
          <h2>{weather.name}, {weather.sys.country}</h2>
        </div>
        <div className="date">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <img 
            src={getWeatherIcon(weather.weather[0].icon)} 
            alt={weather.weather[0].description}
            className="weather-icon"
          />
          <div className="temperature">
            <span className="temp-value">{Math.round(weather.main.temp)}</span>
            <span className="temp-unit">°{temperatureUnit === 'metric' ? 'C' : 'F'}</span>
          </div>
        </div>
        
        <div className="weather-description">
          <h3>{weather.weather[0].main}</h3>
          <p>{weather.weather[0].description}</p>
          <p className="feels-like">
            <Thermometer size={16} />
            {getFeelsLikeText(weather.main.temp, weather.main.feels_like)}
          </p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-grid">
          <div className="detail-item">
            <Droplets className="detail-icon" size={20} />
            <div className="detail-content">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{weather.main.humidity}%</span>
            </div>
          </div>

          <div className="detail-item">
            <Wind className="detail-icon" size={20} />
            <div className="detail-content">
              <span className="detail-label">Wind Speed</span>
              <span className="detail-value">
                {weather.wind.speed} {temperatureUnit === 'metric' ? 'm/s' : 'mph'}
              </span>
            </div>
          </div>

          <div className="detail-item">
            <Eye className="detail-icon" size={20} />
            <div className="detail-content">
              <span className="detail-label">Visibility</span>
              <span className="detail-value">
                {(weather.visibility / 1000).toFixed(1)} km
              </span>
            </div>
          </div>

          <div className="detail-item">
            <Gauge className="detail-icon" size={20} />
            <div className="detail-content">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{weather.main.pressure} hPa</span>
            </div>
          </div>

          <div className="detail-item">
            <Sunrise className="detail-icon" size={20} />
            <div className="detail-content">
              <span className="detail-label">Sunrise</span>
              <span className="detail-value">{formatTime(weather.sys.sunrise)}</span>
            </div>
          </div>

          <div className="detail-item">
            <Sunset className="detail-icon" size={20} />
            <div className="detail-content">
              <span className="detail-label">Sunset</span>
              <span className="detail-value">{formatTime(weather.sys.sunset)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;