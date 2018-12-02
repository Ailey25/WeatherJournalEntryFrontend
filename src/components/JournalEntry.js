import React, { Component } from "react";
import 'babel-polyfill';
import uuidv4 from 'uuid/v4';
import 'babel-polyfill';
import WeatherStamp from "./WeatherStamp.js";
import { CheckboxUpdateWeather } from "./CheckboxUpdateWeather.js"

const CREATE = 'create';
const EDIT = 'edit';
const baseUrl = 'https://localhost:5001/api/values';

class JournalEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.match.params.mode,
      title: '',
      entry: '',
      isUpdateWeather: false,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetState = this.resetState.bind(this);
    this.setIsUpdate = this.setIsUpdate.bind(this);
    this.setHeader = this.setHeader.bind(this);
  }

  componentDidMount() {
    if (this.state.mode === EDIT) {
      let journalEntry = this.props.getJournalEntry(this.props.match.params.id);
        if (journalEntry != undefined) {
          this.setState({
            isEditMode: true,
            title: journalEntry.title,
            entry: journalEntry.entry,
          });
        }
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

  async handleSubmit(e) {
    e.preventDefault();
    // console.log('submit: ' + this.state.title + ' ' + this.state.entry);
    // console.log('update weather? ' + this.state.isUpdateWeather);
    this.resetState();

    if (this.state.mode === CREATE) {
      const weatherObjectId = uuidv4();

      // Add journal entry object to journal entry list
      let journalObject = {
        'title': this.state.title,
        'entry': this.state.entry,
        'id': weatherObjectId,
      };
      this.props.addJournalEntry(journalObject);

      // POST: call backend to add weather object data
      this.setState({loading: true});
      await fetch(baseUrl + '/cityname/' + weatherObjectId + '/Toronto',
        {method: 'POST'}
      )
        .then(response => {
          // console.log(response);
          this.setState({loading: false});
        })
        .catch((error) => {
          console.log(error.message);
          this.setState({
            error: error.message,
            loading: false,
          });
        });

        // TODO: maybe do something to show it was sucecssfully added
    }
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
      // TODO: redirect to error page - param 'mode' not valid
        break;
    }
  }

  render() {
    return (
      <div>
        {this.setHeader()}
        <WeatherStamp id={this.props.match.params.id}
          isShow = {this.state.mode === EDIT} />
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
            isShow = {this.state.mode === EDIT}
            setIsUpdate={this.setIsUpdate} />
          <input type="submit"></input>
        </form>
      </div>
    );
  }
}

export default JournalEntry;
