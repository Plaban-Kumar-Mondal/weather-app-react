import React, { useState } from "react";
import "./scss/style.scss";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const api = {
    key: process.env.REACT_APP_API_KEY,
    url: "https://api.openweathermap.org/data/2.5/",
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
    console.log(query);
  };

  const search = () => {
    return fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setQuery("");
        setWeather(result);
      });
  };

  return (
    <div className="main">
      <nav>
        <h2>
          <i className="fas fa-cloud-sun-rain"></i> Weather App
        </h2>
      </nav>
      <section className="container">
        <div className="search-box">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="eg. Kolkata"
            onChange={handleChange}
            value={query}
          />
          <button className="btn-search" onClick={search}>
            Search <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="result">
          {weather.name ? (
            <div>
              <h2>Weather of {weather.name}</h2>
              <p className="weather-info">
                Weather is: {weather.weather[0].description.toUpperCase()}
                {/* <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="weather icon"
                /> */}
              </p>
              <p className="weather-info">Temperature: {weather.main.temp}°C</p>
              <p className="weather-info">
                Feels like: {weather.main.feels_like}°C
              </p>
              <p className="weather-info">
                Pressure: {weather.main.pressure}atm
              </p>
              <p className="weather-info">Humidity: {weather.main.humidity}%</p>
              <p className="weather-info">Cloudiness: {weather.clouds.all}%</p>
            </div>
          ) : (
            <h2>Search For Your City</h2>
          )}
        </div>
      </section>
      <footer>
        <p>Created By Plaban Kumar Mondal</p>
        <p>
          <a href="https://twitter.com/PlabanKrMondal" target="_blank">
            Follow Me on <i class="fab fa-twitter-square"></i>
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
