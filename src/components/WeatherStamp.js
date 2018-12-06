import React, { Component } from "react";
import 'babel-polyfill';

const baseUrl = '/api/values';
const weatherObjectParam = '/weatherobject';
const weatherParam = '/weather';
const mainParam = '/main';

class WeatherStamp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: '',
      main: {},
      weather: [],
    }
    this.temp = this.temp.bind(this);
    this.decription = this.description.bind(this);
  }

  async componentDidMount() {
    if (this.props.isShow) {
      // FETCHING CITY NAME
      this.setState({loading: true});
      await fetch(baseUrl + weatherObjectParam + '/' + this.props.id)
        .then(response => response.json())
        .then((data) => {
          this.setState({
            loading: false,
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
        await fetch(baseUrl + mainParam + '/' + this.props.id)
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
        await fetch(baseUrl + weatherParam + '/' + this.props.id)
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
  }

  temp(unit) {
    if (unit === 'C') {
      let tempCelcius = this.state.main.temp - 273.15;
      tempCelcius = Math.round(tempCelcius * 100) / 100;
      return(
        <label>{tempCelcius}<sup>°C</sup></label>
      );
    } else if (unit === 'F') {
      let tempFahrenheit = (this.state.main.temp - 273.15) * 9/5 + 32;
      tempFahrenheit = Math.round(tempFahrenheit * 100) / 100;
      return(
        <label>{tempFahrenheit}<sup>°F</sup></label>
      );
    } else {
      return (
        <label>Invalid unit</label>
      );
    }
  }

  description() {
    let descriptions = this.state.weather.map((weather) => {
      return (
        <label key={weather.id}>
          {weather.description}
        </label>
      );
    });
    return descriptions;
  }

  render() {
    if (!(this.props.isShow)) return null;

    if (this.state.loading) {
      return(<div>Loading weather info...</div>);
    }

    return(
      <div>
        <label>{this.state.name}</label>
        <br></br>
        {this.temp('C')}
        <br></br>
        <i>{this.description()}</i>
      </div>
    );
  }
}

export default WeatherStamp;
