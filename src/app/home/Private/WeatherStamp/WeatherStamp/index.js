import React from 'react';

import { CREATE } from '../../../constants';
import { calcTemp } from '../../../utility.js';

import { WeatherStampStyle, ImageContainer, Label } from './styles';

const WeatherStamp = (props) => {
  if (props.isLoading) return(<div>Loading weather info...</div>);

  let convertedTemp = '' + calcTemp(props.temp, props.unit);

  let displayWeathers = (weathers) => {
    if (weathers === undefined || weathers.length === 0) {
      return null;
    }

    let list = weathers.map((weather) => (
      <div key={weather.weatherId} className="row">
        <ImageContainer>
          <img src={"https://openweathermap.org/img/w/" + weather.icon + ".png"} />
        </ImageContainer>
        <div className="columnCenter">
          <label>{weather.description}</label>
        </div>
      </div>
    ));
    return (<div id="weathers" className="columnCenter">{list}</div>);
  };

  return (
    <WeatherStampStyle>
      <div className="column">
        <label>{props.cityName}</label>
        <div className="row flexEnd">
          <Label id="temp" size="2em">{convertedTemp}</Label>
          <sup>
            <Label id="unit" size="1.5em">°{props.unit}</Label>
          </sup>
        </div>
      </div>
      {displayWeathers(props.weathers)}
    </WeatherStampStyle>
  );
}

export { WeatherStamp };
