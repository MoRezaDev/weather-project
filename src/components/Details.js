import React from "react";

import styles from "./Details.module.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const weatherValue = {
  clear: "https://svgshare.com/i/m1e.svg",
  clouds:
    "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg",
  rain: "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-7.svg",
  snow: "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/snowy-6.svg",
};

const Details = ({ data, forecast }) => {
  const DayinAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(DayinAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, DayinAWeek)
  );
  console.log(forecastDays);
  if (data && forecast) {
    const {
      main: { humidity, pressure },
      wind: { speed },
    } = data;

    return (
      <div className={styles.container}>
        <div className={styles.containerInSide}>
          <div className={styles.titleCurrentWeather}>
            <h2>Weather Details</h2>
            <div></div>
          </div>
          <div className={styles.currentWeatherContainer}>
            <div className={styles.currentWeatherDetails}>
              <span>Humidity</span>
              <span>{humidity}%</span>
            </div>
            <div className={styles.currentWeatherDetails}>
              <span>Pressure</span>
              <span>{pressure}</span>
            </div>
            <div className={styles.currentWeatherDetails}>
              <span>Wind</span>
              <span>{speed}Km/h</span>
            </div>
          </div>
          <div className={styles.forecastContainer}>
            <div>
              <div className={styles.titleCurrentWeather}>
                <h2>Forecast Details</h2>
                <div style={{ marginBottom: "30px" }}></div>
              </div>
            </div>
            {forecast.daily.slice(1, 7).map((item, idx) => (
              <div key={idx} className={styles.forecastItems}>
                <h2>{forecastDays[idx]}</h2>
                <img
                  alt="img"
                  src={`${weatherValue[item.weather[0].main.toLowerCase()]}`}
                />
                <h2>{item.temp.day}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Details;
