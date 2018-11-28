import React, { Component } from "react";
import { CheckboxUpdateWeather } from "./CheckboxUpdateWeather.js"

const CREATE = 'create';
const EDIT = 'edit';

class JournalEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.match.params.mode,
      title: '',
      entry: '',
      isUpdateWeather: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetState = this.resetState.bind(this);
    this.setIsUpdate = this.setIsUpdate.bind(this);
    this.setHeader = this.setHeader.bind(this);
  }

  componentWillMount() {
    if (this.state.mode === EDIT) {
        this.setState({
          isEditMode: true,
          title: 'Some hardcoded title',
          entry: 'Some hardcoded entry',
        });
    }
  }

  handleChange(e) {
    //console.log('change: ' + e.currentTarget.id)
    switch(e.currentTarget.id) {
      case "title":
        this.setState({
            title: e.currentTarget.value,
        });
        break;
      case "entry":
        this.setState({
            entry: e.currentTarget.value,
        });
        break;
      case "updateWeather":
        this.setState({
          isUpdateWeather: false,
        });
        break;
      default:
        console.log('handleChange: current target id not here');
        break;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    //console.log('submit: ' + this.state.title + ' ' + this.state.entry);
    //console.log('update weather? ' + this.state.isUpdateWeather);
    this.resetState();
  }

  resetState() {
    this.setState({
      title: '',
      entry: '',
    });
  }

  setIsUpdate(bool) {
    this.setState({
      isUpdateWeather: bool,
    });
  }

  setHeader() {
    switch (this.state.mode) {
      case CREATE:
        return (
          <h2>Creating Journal Entry</h2>
        );
      case EDIT:
        return(
          <h2>Editing Journal Entry</h2>
        );
      default:
      //TODO: redirect to error page - param 'mode' not valid
        break;
    }
  }

  render() {
    return (
      <div>
        {this.setHeader()}
        <form onSubmit={this.handleSubmit}>
          <section>
            <input id="title"
              placeholder="Enter journal title"
              value={this.state.title}
              onChange = {this.handleChange}>
            </input>
          </section>
          <section>
            <textarea id="entry"
              rows="10" cols="50"
              placeholder="Your journal entry"
              value={this.state.entry}
              onChange={this.handleChange}>
            </textarea>
          </section>
          <CheckboxUpdateWeather
            isCreateMode = {this.state.mode === CREATE}
            setIsUpdate={this.setIsUpdate} />
          <input type="submit"></input>
        </form>
      </div>
    );
  }
}

export default JournalEntry;
