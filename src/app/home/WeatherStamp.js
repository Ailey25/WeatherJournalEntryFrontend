import React from "react";
import { CREATE } from './constants';
import { calcTemp } from './utility.js';

const WeatherStamp = (props) => {
  if (props.mode === CREATE) return null;
  if (props.isLoading) return(<div>Loading weather info...</div>);

  let convertedTemp = calcTemp(props.temp, props.unit);

  return (
    <div>
      <label>{props.cityName}</label>
      <br></br>
      <label>{convertedTemp}<sup>°{props.unit}</sup></label>
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
