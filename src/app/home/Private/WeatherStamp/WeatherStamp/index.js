import React from 'react';

import { CREATE } from '../../../constants';
import { calcTemp } from '../../../utility.js';

const WeatherStamp = (props) => {
  if (props.mode === CREATE) return null;
  if (props.isLoading) return(<div>Loading weather info...</div>);

  let convertedTemp = calcTemp(props.temp, props.unit);
  let displayWeathers = (weathers) => {
    if (weathers === undefined || weathers.length === 0) {
      return (<div></div>);
    }
    let list = weathers.map((weather) => (
      <label key={weather.weatherId}>
        <img src={"http://openweathermap.org/img/w/" + weather.icon + ".png"} />
        {weather.description}&nbsp;
      </label>
    ));
    return (<div>{list}</div>);
  };

  return (
    <div>
      <label>{props.cityName}</label>
      <div>
        <label>{convertedTemp}<sup>°{props.unit}</sup></label>
      </div>
      {displayWeathers(props.weather)}
    </div>
  );
}

export { WeatherStamp };
