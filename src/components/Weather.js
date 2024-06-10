import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState();
  const [error, setError] = useState("");

  const API_KEY = "ae3e143f448b41c36a0dbf43c2c31872";

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherDetails();
  };

  const fetchWeatherDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError(null);
      setCity("");
      setCountry("");
    } catch (err) {
      setError("City & Country Not Found");
      setWeather(null);
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City"
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter Country"
        />
        <button type="submit" onClick={handleSearch}>
          Search
        </button>
      </form>

      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h3>Name: {weather.name}</h3>
          <p>Description: {weather.weather[0].description}</p>
          <p>Temparture: {weather.main.temp}</p>
          <p>Humidity: {weather.main.humidity}</p>
          <p>Wind Speed: {weather.wind.speed}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;

// https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric
// const API_KEY = "ae3e143f448b41c36a0dbf43c2c31872";
