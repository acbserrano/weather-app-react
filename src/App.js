import "./App.css";

import WeatherApp from "./WeatherApp";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <WeatherApp defaultCity="Lisbon" />
      </div>
    </div>
  );
}
