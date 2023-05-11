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
      temperature: Math.round(response.data.temperature.current),
      humidity: response.data.temperature.humidity,
      date: new Date(response.data.time * 1000),
      wind: response.data.wind.speed,
      city: response.data.city,
      description: response.data.condition.description,
      icon: `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`,
    });
  }

  function search() {
    const apiKey = "0fa3104eo0aa5adfe05t8da10af2b9bf";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
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
