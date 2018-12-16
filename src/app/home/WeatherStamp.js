import React from "react";
import { CREATE } from './constants.js';

const WeatherStamp = (props) => {
  if (props.mode === CREATE) return null;
  if (props.loading) return(<div>Loading weather info...</div>);
  return (
    <div>
      <label>{props.cityName}</label>
      <br></br>
      <label>{props.temp}<sup>°{props.unit}</sup></label>
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
