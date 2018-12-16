import React, { Component } from "react";
import 'babel-polyfill';
import { WeatherStamp } from './WeatherStamp.js';
import {
  EDIT,
  CELCIUS,
  FAHRENHEIT,
  BASE_URL,
} from './constants.js'

class WeatherStampContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityid: '',
      name: '',
      main: {},
      weather: [],
      loading: false,
    }
    this.calcTemp = this.calcTemp.bind(this);
  }

  async componentDidMount() {
    if (this.props.mode === EDIT) {
      // FETCHING WEATHER OBJECT
      this.setState({loading: true});
      await fetch(BASE_URL + '/weatherobject/' + this.props.id)
        .then(response => response.json())
        .then((data) => {
          this.setState({
            loading: false,
            cityid: data.id,
            name: data.name,
          });
        })
        .catch((error) => {
          this.setState({
            error: error.message,
            loading: false,
          });
        });

        // FETCHING MAIN (temperature)
        this.setState({loading: true});
        await fetch(BASE_URL + '/main/' + this.props.id)
          .then(response => response.json())
          .then((data) => {
            this.setState({
              loading: false,
              main: data,
            });
          })
          .catch((error) => {
            this.setState({
              error: error.message,
              loading: false,
            });
          });

        // FETCHING WEATHER ARRAY
        this.setState({loading: true});
        await fetch(BASE_URL + '/weather/' + this.props.id)
          .then(response => response.json())
          .then((data) => {
            this.setState({
              loading: false,
              weather: data,
            });
          })
          .catch((error) => {
            this.setState({
              error: error.message,
              loading: false,
            });
          });
      }

      this.props.setCityId(this.state.cityid);
  }

  calcTemp(unit) {
    if (unit === CELCIUS) {
      let tempCelcius = this.state.main.temp - 273.15;
      tempCelcius = Math.round(tempCelcius * 100) / 100;
      return tempCelcius;
    } else if (unit === FAHRENHEIT) {
      let tempFahrenheit = (this.state.main.temp - 273.15) * 9/5 + 32;
      tempFahrenheit = Math.round(tempFahrenheit * 100) / 100;
      return tempFahrenheit;
    }
  }

  render() {
    const component = this;
    return (
      <WeatherStamp
        mode={component.props.mode}
        loading={component.state.loading}
        cityName={component.state.name}
        unit={CELCIUS}
        temp={component.calcTemp(CELCIUS)}
        weather={component.state.weather} />
    );
  }
}

export default WeatherStampContainer;
