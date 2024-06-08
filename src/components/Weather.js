import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "ae3e143f448b41c36a0dbf43c2c31872";

  const fetchWeatherDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log(response.data);
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError("City Not Found");
      setWeather(null);
    }
  };
  const handleSearch = () => {
    fetchWeatherDetails();
  };

  return (
    <div>
      <h2>Weather App</h2>
      <input
        type="text"
        placeholder="Enter City Name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h3>City Name: {weather.name}</h3>
          <p>Description: {weather.weather[0].description}</p>
          <p>Temprature: {weather.main.temp}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
