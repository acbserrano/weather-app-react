import React, { useState } from "react";
import axios from "axios";

import "./WeatherApp.css";
import Footer from "./Footer";
import FormattedDate from "./FormattedDate";
import { Audio } from "react-loader-spinner";

export default function WeatherApp(props) {
  let [weatherData, setWeatherData] = useState({ loaded: false });

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
      icon: "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
    });
  }

  if (weatherData.loaded) {
    return (
      <div>
        <div className="search-engine">
          <form>
            <div className="row">
              <input
                type="search"
                placeholder="Enter a city..."
                className="form-control border-0 border-bottom rounded-0 w-25"
                autoFocus="on"
              />
              <input
                className="btn border-0 search-button"
                type="submit"
                value="Search"
              />
            </div>
          </form>
        </div>
        <div className="Weather">
          <div className="row gridInfo">
            <div className="col-5 text-end align-middle">
              <h1>{weatherData.city}</h1>
              <h2>
                {" "}
                <FormattedDate date={weatherData.date} />
              </h2>
            </div>
            <div className="col-2 text-center align-middle">
              <img src={weatherData.icon} alt={weatherData.description} />
            </div>
            <div className="col-5">
              <ul>
                <li> {weatherData.description}</li>
                <li>Temperature: {weatherData.temperature}ºC</li>
                <li>Humidity: {weatherData.humidity}%</li>
                <li>Wind: {weatherData.wind}km/h</li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    const apiKey = "73a00877081bd43422bdee0f3022beb5";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);

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
