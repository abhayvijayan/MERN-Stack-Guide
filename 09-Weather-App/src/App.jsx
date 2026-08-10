import { useState, useEffect } from 'react'

function App() {
  const [city, setCity] = useState('London');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect is a React Hook that runs "side effects" (like fetching data).
  // The empty array [] at the end means "only run this ONCE when the component first loads".
  // If we put [city] inside the array, it would run every time 'city' changes.
  useEffect(() => {
    fetchWeather(city);
  }, []); // <-- Dependency array

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      // We are using a free weather API (Open-Meteo) which doesn't require an API key for basic usage.
      // First, we must geocode the city name to get its latitude and longitude.
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Now fetch the actual weather using the coordinates
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      const weatherJson = await weatherRes.json();

      setWeatherData({
        name,
        country,
        temperature: weatherJson.current_weather.temperature,
        windspeed: weatherJson.current_weather.windspeed
      });
      
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  // Basic styling
  const styles = {
    container: { maxWidth: '400px', margin: '50px auto', textAlign: 'center', fontFamily: 'sans-serif', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' },
    input: { padding: '8px', width: '60%', marginRight: '10px' },
    button: { padding: '8px 15px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px' },
    card: { marginTop: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }
  };

  return (
    <div style={styles.container}>
      <h2>Weather App</h2>
      
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Search</button>
      </form>

      {/* Conditional Rendering based on state */}
      {loading && <p>Loading weather data...</p>}
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {weatherData && !loading && (
        <div style={styles.card}>
          <h3>{weatherData.name}, {weatherData.country}</h3>
          <h1 style={{ fontSize: '48px', margin: '10px 0' }}>{weatherData.temperature}°C</h1>
          <p>Wind Speed: {weatherData.windspeed} km/h</p>
        </div>
      )}
    </div>
  )
}

export default App
