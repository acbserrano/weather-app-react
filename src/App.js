import "./App.css";

import WeatherApp from "./WeatherApp";
import Footer from "./Footer";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <WeatherApp defaultCity="New York" />
      </div>
    </div>
  );
}
