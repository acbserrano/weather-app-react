import React, { useState } from "react";
import axios from "axios";

import "./App.css";

export default function WeatherApp() {
  let [city, setCity] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState({});

  function displayCondition(response) {
    setLoaded(true);
    setWeather({
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSearch(event) {
    event.preventDefault();

    let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayCondition);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleClick(event) {
    updateCity(event);
    handleSearch(event);
  }

  let form = (
    <form onSubmit={handleSearch}>
      <input
        className="formCity"
        type="search"
        placeholder="Enter a city..."
        big
        onChange={updateCity}
      />
      <input className="formCity" type="submit" value="Search" />
    </form>
  );

  let namesCities = (
    <div onClick={handleClick}>
      <button value="Madrid">Madrid</button>
      <button value="London">London</button>
      <button value="Paris">Paris</button>
    </div>
  );

  if (loaded) {
    return (
      <div className="weatherApp">
        <h1>Weather App</h1>
        {form}
        <ul>
          <li>
            <strong className="cityName">{city}</strong>
          </li>
          <li>temperature: {weather.temperature}°C</li>
          <li>humidity: {weather.humidity}%</li>
          <li>wind: {weather.wind}km/h</li>
          <li>{weather.description}</li>
          <li>
            {" "}
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
        {namesCities}
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Weather App</h1>
        {form}
        {namesCities}
      </div>
    );
  }
}
