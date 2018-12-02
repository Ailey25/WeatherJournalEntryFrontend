import React, { Component } from "react";
import 'babel-polyfill';

const baseUrl = 'https://localhost:5001/api/values';
const weatherObjectParam = '/weatherobject';
const weatherParam = '/weather';

class WeatherStamp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: '',
      weather: [],
    }
  }

  async componentDidMount() {
    if (this.props.isShow) {
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

  render() {
    if (!(this.props.isShow)) {
      return null;
    }

    return(
      <div >
        <label>{this.state.name}</label>
      </div>
    );
  }
}

export default WeatherStamp;
