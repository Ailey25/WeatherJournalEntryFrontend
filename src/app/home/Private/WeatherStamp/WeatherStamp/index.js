import React from 'react';

import { CREATE } from '../../../constants';
import { calcTemp } from '../../../utility.js';

import { WeatherStampStyle, ImageContainer, Label } from './styles';

const WeatherStamp = (props) => {
  if (props.mode === CREATE) return null;
  if (props.isLoading) return(<div>Loading weather info...</div>);

  let convertedTemp = calcTemp(props.temp, props.unit).toString();

  let displayWeathers = (weathers) => {
    if (weathers === undefined || weathers.length === 0) {
      return (<div className="columnCenter"></div>);
    }

    let list = weathers.map((weather) => (
      <div key={weather.weatherId} className="row">
        <ImageContainer>
          <img src={"http://openweathermap.org/img/w/" + weather.icon + ".png"} />
        </ImageContainer>
        <div className="columnCenter">
          <label>{weather.description}</label>
        </div>
      </div>
    ));
    return (<div className="columnCenter">{list}</div>);
  };

  return (
    <WeatherStampStyle>
      <div className="column">
        <label>{props.cityName}</label>
        <div className="row flexEnd">
          <Label size="2em">{convertedTemp}</Label>
          <sup>
            <Label size="1.5em">°{props.unit}</Label>
          </sup>
        </div>
      </div>
      {displayWeathers(props.weather)}
    </WeatherStampStyle>
  );
}

export { WeatherStamp };
