import React from "react";

import "./WeatherApp.css";
import FormattedDate from "./FormattedDate";

export default function WeatherInfo(props) {
  return (
    <div className="Weather">
      <div className="row gridInfo">
        <div className="col-5 text-end align-middle">
          <h1>{props.data.city}</h1>
          <h2>
            {" "}
            <FormattedDate date={props.data.date} />
          </h2>
        </div>
        <div className="col-2 text-center align-middle">
          <img src={props.data.icon} alt={props.data.description} />
        </div>
        <div className="col-5">
          <ul>
            <li>Temperature: {props.data.temperature}ºC</li>
            <li>Humidity: {props.data.humidity}%</li>
            <li>Wind: {props.data.wind}km/h</li>
            <li> {props.data.description}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
