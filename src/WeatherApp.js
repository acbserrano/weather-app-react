import React, { useState } from "react";
import axios from "axios";

import "./WeatherApp.css";
import Footer from "./Footer";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

import { Audio } from "react-loader-spinner";

export default function WeatherApp(props) {
  let [weatherData, setWeatherData] = useState(false);
  let [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    setWeatherData({
      loaded: true,
      coordinates: response.data.coord,
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      wind: response.data.wind.speed,
      city: response.data.name,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
    });
  }

  function search() {
    const apiKey = "c5f0e59acac64258bb92ed027d20c68f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function searchCity(event) {
    event.preventDefault();
    search();
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="search-engine">
      <form onSubmit={searchCity}>
        <div className="row">
          <input
            type="search"
            placeholder="Enter a city..."
            className="form-control border-0 border-bottom rounded-0 w-25"
            autoFocus="on"
            onChange={updateCity}
          />
          <input
            className="btn border-0 search-button"
            type="submit"
            value="Search"
          />
        </div>
      </form>
    </div>
  );

  if (weatherData.loaded) {
    return (
      <div>
        {form}
        <WeatherInfo data={weatherData} />
        <div className="WeatherForecast-layout">
          <WeatherForecast coordinates={weatherData.coordinates} />
        </div>
        <Footer />
      </div>
    );
  } else {
    search();

    return (
      <Audio
        height="30"
        width="30"
        radius="9"
        color="#000350"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    );
  }
}
