import React, { useState } from "react";
import axios from "axios";

import "./WeatherApp.css";
import Footer from "./Footer";
import WeatherInfo from "./WeatherInfo";

import { Audio } from "react-loader-spinner";

export default function WeatherApp(props) {
  let [weatherData, setWeatherData] = useState({ loaded: false });
  let [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    console.log(response.data);
    setWeatherData({
      loaded: true,
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
    const apiKey = "eae061c95483dd066657bfc7525418ed";
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
