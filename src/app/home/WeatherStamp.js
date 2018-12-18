import React from "react";
import { CREATE, CELCIUS, FAHRENHEIT } from './constants';
import { kelvinToCelcius, kelvinToFahrenheit } from './utility.js';

const WeatherStamp = (props) => {
  if (props.mode === CREATE) return null;
  if (props.isLoading) return(<div>Loading weather info...</div>);

  let temp;
  if (props.unit === CELCIUS) {
    temp = kelvinToCelcius(props.temp);
  } else if (props.unit === FAHRENHEIT) {
    temp = kelvinToFahrenheit(props.temp);
  }

  return (
    <div>
      <label>{props.cityName}</label>
      <br></br>
      <label>{temp}<sup>°{props.unit}</sup></label>
      <br></br>
      { // weather descriptions
        props.weather.map((weather) => (
          <label key={weather.id}>
            {weather.description}&nbsp;
          </label>
        ))
      }
    </div>
  );
}

export { WeatherStamp };
