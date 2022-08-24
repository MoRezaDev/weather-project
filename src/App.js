import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

//importing styles....
//calling Api Weather....
import { WEATHER_BASE_URL, openWeatherApiKey } from "./components/api";
import { TIMEZONE_BASE_URL, timeZoneApiKey } from "./components/api";

//importing images....
import defaultImg from "./images/defaultImg.jpg";
import clear from "./images/clear.jpg";
import clouds from "./images/clouds.jpg";
import rain from "./images/rain.jpg";
import snow from "./images/snow.jpg";

//import weather icons....

//importing components
import Search from "./components/Search";
import Details from "./components/Details";

const weatherValue = {
  clear: "https://svgshare.com/i/m1e.svg",
  clouds:
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg",
  rain: "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-7.svg",
  snow: "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/snowy-6.svg",
};

function App() {
  const [data, setData] = useState(null);
  const [weather, setWeather] = useState(null);
  const [date, setDate] = useState(null);
  const [animateValue, setAnimateValue] = useState(true);
  const [forecast, setForecast] = useState(null);

  const onSearchChange = (searchData) => {
    console.log(searchData);
    const [lat, lon] = searchData.value.split(" ");
    axios
      .get(
        `${TIMEZONE_BASE_URL}/timezone?apiKey=${timeZoneApiKey}&lat=${lat}&long=${lon}`
      )
      .then((response) => {
        setDate(response.data);
      });
    axios
      .get(
        `${WEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherApiKey}`
      )
      .then((response) => {
        setData(response.data);
        setWeather(response.data.weather[0].main.toLowerCase());
      });
    axios
      .get(
        `${WEATHER_BASE_URL}/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherApiKey}&exclude=hourly`
      )
      .then((response) => {
        setForecast(response.data);
      });
  };
  const animateValueHandler = () => {
    setAnimateValue(false);
  };

  useEffect(() => {
    setAnimateValue(true);
  }, [data]);
  return (
    <div
      onAnimationEnd={animateValueHandler}
      className={animateValue ? "App active" : "App"}
      style={
        weather
          ? {
              backgroundImage: `url(${
                weather === "clear"
                  ? clear
                  : weather === "clouds"
                  ? clouds
                  : weather === "rain"
                  ? rain
                  : weather === "snow"
                  ? snow
                  : null
              })`,
            }
          : { backgroundImage: `url(${defaultImg})` }
      }
    >
      <Search onSearchChange={onSearchChange} />
      <h2 className="title-header">
        please Turn on your P*r*o*x*y if you live in Iran
      </h2>
      <Details forecast={forecast} data={data} weather={weather} />
      {data && (
        <div className="title-container">
          <h1>{Math.round(data.main.temp)}°</h1>
          <div className="title-items">
            {data && <h2>{data.name}</h2>}
            {date && <h3>{date.date_time_txt}</h3>}
          </div>
          <div className="title-items">
            <img width={100} src={`${weatherValue[weather]}`} />
            {weather && <h3>{weather}</h3>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
