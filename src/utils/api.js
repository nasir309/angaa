const API_KEY = 'f6707fff995a431c7251d28b0b5d34c3';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export const getCurrentWeather = async (lat, lon, units = 'metric') => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`Weather API Error: ${error.message}`);
  }
};

export const getForecast = async (lat, lon, units = 'metric') => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`Forecast API Error: ${error.message}`);
  }
};

export const getLocationByName = async (locationName) => {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(locationName)}&limit=5&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`Location API Error: ${error.message}`);
  }
};