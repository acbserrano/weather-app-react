import React from "react";

import "./WeatherApp.css";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherInfo(props) {
  return (
    <div className="Weather">
      <div className="row gridInfo">
        <div className="col-5 text-end align-middle">
          <h1>{props.data.city}</h1>
          <h2>
            <FormattedDate date={props.data.date} />
          </h2>
        </div>
        <div className="col-2 text-center align-middle mt-3">
          <WeatherIcon code={props.data.icon} alt={props.data.description} />
        </div>
        <div className="col-5">
          <ul>
            <li className="text-capitalize">{props.data.description}</li>
            <li>
              <WeatherTemperature
                celsius={props.data.temperature}
                className="d-inline"
              />
            </li>

            <li>
              Humidity: <strong>{props.data.humidity}%</strong>
            </li>
            <li>
              Wind: <strong>{props.data.wind}km/h</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
