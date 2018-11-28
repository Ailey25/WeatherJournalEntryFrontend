import React, { Component } from "react";

// A checkbox for updating the weather information
// to the latest when journal entry is being modified
export class CheckboxUpdateWeather extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.setIsUpdate(e.currentTarget.checked);
  }

  render() {
    if (this.props.isCreateMode) {
      return null;
    }

    return (
      <section>
        <input id="test"
          type="checkbox"
          onChange={this.handleChange}>
        </input>
        <label>Update weather information</label>
      </section>
    );
  }
}
