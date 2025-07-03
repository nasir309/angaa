import { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';
import LoadingSpinner from './components/LoadingSpinner';
import { getCurrentWeather, getForecast, getLocationByName } from './utils/api';
import './App.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('New York');
  const [temperatureUnit, setTemperatureUnit] = useState('metric'); // metric or imperial

  const fetchWeatherData = async (locationName) => {
    try {
      setLoading(true);
      setError(null);
      
      const locationData = await getLocationByName(locationName);
      if (!locationData || locationData.length === 0) {
        throw new Error('Location not found');
      }

      const { lat, lon } = locationData[0];
      
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(lat, lon, temperatureUnit),
        getForecast(lat, lon, temperatureUnit)
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setLocation(weatherData.name);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            setLoading(true);
            setError(null);
            
            const { latitude, longitude } = position.coords;
            
            const [weatherData, forecastData] = await Promise.all([
              getCurrentWeather(latitude, longitude, temperatureUnit),
              getForecast(latitude, longitude, temperatureUnit)
            ]);

            setCurrentWeather(weatherData);
            setForecast(forecastData);
            setLocation(weatherData.name);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        },
        () => {
          fetchWeatherData('New York');
        }
      );
    } else {
      fetchWeatherData('New York');
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (currentWeather) {
      fetchWeatherData(location);
    }
  }, [temperatureUnit]);

  const handleSearch = (searchLocation) => {
    fetchWeatherData(searchLocation);
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  const getBackgroundClass = () => {
    if (!currentWeather) return 'default';
    
    const condition = currentWeather.weather[0].main.toLowerCase();
    const isDay = currentWeather.dt > currentWeather.sys.sunrise && currentWeather.dt < currentWeather.sys.sunset;
    
    if (condition.includes('clear')) return isDay ? 'clear-day' : 'clear-night';
    if (condition.includes('cloud')) return 'cloudy';
    if (condition.includes('rain') || condition.includes('drizzle')) return 'rainy';
    if (condition.includes('snow')) return 'snowy';
    if (condition.includes('thunder')) return 'stormy';
    if (condition.includes('mist') || condition.includes('fog')) return 'misty';
    
    return 'default';
  };

  return (
    <div className={`app ${getBackgroundClass()}`}>
      <div className="container">
        <header className="header">
          <h1 className="title">Angaa</h1>
          <button 
            className="unit-toggle"
            onClick={toggleTemperatureUnit}
          >
            °{temperatureUnit === 'metric' ? 'C' : 'F'}
          </button>
        </header>

        <SearchBar onSearch={handleSearch} />

        {loading && <LoadingSpinner />}

        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
            <button onClick={() => fetchWeatherData(location)}>Try Again</button>
          </div>
        )}

        {!loading && !error && currentWeather && (
          <>
            <WeatherCard 
              weather={currentWeather} 
              temperatureUnit={temperatureUnit}
            />
            
            {forecast && (
              <Forecast 
                forecast={forecast} 
                temperatureUnit={temperatureUnit}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;