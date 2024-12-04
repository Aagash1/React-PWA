import React, { useState, useEffect } from "react";

const Weather = () => {
  const [city, setCity] = useState(""); 
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(""); 
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener('offline', updateOnlineStatus);
    window.addEventListener('online', updateOnlineStatus);
    return () => {
      window.removeEventListener('offline', updateOnlineStatus);
      window.removeEventListener('online', updateOnlineStatus);
    };
  }, []);

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a valid city name.");
      return;
    }

    if (isOffline) {
      const cachedData = localStorage.getItem(city);
      if (cachedData) {
        setWeather(JSON.parse(cachedData));
        setError("You are offline. Showing cached data.");
      } else {
        setWeather(null);
        setError("You are offline and no cached data is available.");
      }
      return;
    }

    const url = `http://localhost:4000/api/weather?city=${city}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error fetching data from server.");
      }
      const result = await response.json();
      setWeather(result);
      localStorage.setItem(city, JSON.stringify(result)); 
      setError("");
    } catch (err) {
      const cachedData = localStorage.getItem(city);
      if (cachedData) {
        setWeather(JSON.parse(cachedData));
        setError("You are offline. Showing cached data.");
      } else {
        setWeather(null);
        setError("Failed to fetch data, and no cached data is available.");
      }
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.temp}°C</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
