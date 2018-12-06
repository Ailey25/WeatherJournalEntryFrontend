import React, { Component } from "react";
import 'babel-polyfill';
import uuidv4 from 'uuid/v4';
import 'babel-polyfill';
import WeatherStamp from "./WeatherStamp.js";

const CREATE = 'create';
const EDIT = 'edit';
const CITY_ID = 'cityid';
const CITY_NAME = 'cityname';
const baseUrl = '/api/values';

class JournalEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.match.params.mode,
      title: '',
      entry: '',
      callTypeAPI: CITY_NAME,
      callParams: '',
      error: '',
      status: '',
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setWeatherObjectId = this.setWeatherObjectId.bind(this);
    this.setFetchUrl = this.setFetchUrl.bind(this);
    this.updateJournalEntryList = this.updateJournalEntryList.bind(this);
    this.validateSubmission = this.validateSubmission.bind(this);
    this.resetState = this.resetState.bind(this);
    this.setHeader = this.setHeader.bind(this);
    this.getAPICallParam = this.getAPICallParam.bind(this);
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
      case CITY_NAME:
        this.setState({
          callTypeAPI: CITY_NAME,
        });
        break;
      case CITY_ID:
        this.setState({
          callTypeAPI: CITY_ID,
        });
        break;
      case 'callParams':
        this.setState({
          callParams: e.currentTarget.value,
        });
        break;
      default:
        this.setState({
          error: 'handleChange: current target id ' +
                  e.currentTarget.id + ' not handled'
        });
        break;
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    //console.log('here: ' + this.state.callTypeAPI + ': ' + this.state.callParams);
    if (this.state.mode === CREATE) {
      if (!this.validateSubmission()) return;
    } else if (this.state.mode === EDIT) {
      console.log('Edit mode submission isn\'t implemented yet');
      return; // handle update info
    }

    let weatherObjectId = this.setWeatherObjectId();
    let fetchUrl = this.setFetchUrl(weatherObjectId);

    // POST: callbackend to update/add weather object data
    this.setState({loading: true});
    const component = this;
    await fetch(fetchUrl, {method: 'POST'})
      .then(response => {
        if (response.ok) {
          component.setState({
            status: '200',
            loading: false
          });
        } else {
          component.setState({
            status: error.status,
            loading: false,
          });
        }
      })
      .catch((error) => {
        component.setState({
          error: error.message,
          status: error.status,
          loading: false,
        });
      });

    if (this.state.status === '200') {
      if (this.updateJournalEntryList(weatherObjectId)) {
        this.resetState();
      }
    } else {
      this.setState({
        error: 'Journal entry could not be added - Invalid location',
      })
    }
  }

  setWeatherObjectId() {
    let weatherObjectId = '';
    if (this.state.mode === CREATE) {
      weatherObjectId = uuidv4();
    } else if (this.state.mode === EDIT) {
      weatherObjectId = this.props.match.params.id;
    } else {
      this.setState({
        error: 'Journal entry mode not recognized'
      })
    }
    return weatherObjectId;
  }

  setFetchUrl(weatherObjectId) {
    let params = this.state.callParams.split(',').map(param => {
      return param.trim().replace(/\s\s+/g, ' ');
    });
    let fetchUrl = baseUrl;
    switch(this.state.callTypeAPI) {
      case CITY_NAME:
        let byCityNameParam = '/' + params[0];
        if (params.length > 1) {
          byCityNameParam += '/' + params[1];
        }
        fetchUrl += '/' + CITY_NAME + '/' + weatherObjectId + byCityNameParam;
        return fetchUrl;
      case CITY_ID:
        let byCityIdParam = '/' + params[0];
        fetchUrl += '/' + CITY_ID + '/' + weatherObjectId + byCityIdParam;
        return fetchUrl;
      default:
        this.setState({
          error: 'API call param not recognized'
        })
        return;
    }
  }

  updateJournalEntryList(weatherObjectId) {
    let journalObject = {
      'title': this.state.title,
      'entry': this.state.entry,
      'id': weatherObjectId,
    };
    switch(this.props.match.params.mode) {
      case CREATE:
        this.props.addJournalEntry(journalObject);
        return true;
      case EDIT:
        this.props.editJournalEntry(journalObject);
        return true;
      default:
        this.setState({
          error: 'Journal entry mode not recognized'
        })
        return false;
    }
  }

  validateSubmission() {
    // Check for empty param
    if (this.state.callParams.length == 0) {
      this.setState({
        error: 'Location value cannot be empty',
      });
      return false;
    }

    switch(this.state.callTypeAPI) {
      case CITY_NAME:
        let alphabetsCheck = /^[a-z][a-z/\s,]*$/i.test(this.state.callParams);
        let commaCheck = /^[^,]+,[^,]+$/.test(this.state.callParams);
        if (this.state.callParams.indexOf(',') != -1) {
          if (!commaCheck) {
            this.setState({
              error: 'Enter country code after comma or remove comma',
            });
            return false;
          }
        }
        if (!(alphabetsCheck)) {
          this.setState({
            error: 'City name and/or country code can only contain alphabets',
          });
          return false;
        }
        return true;
      case CITY_ID:
        let numbersCheck = /^[0-9]+$/.test(this.state.callParams);
        if (!numbersCheck) {
          this.setState({
            error: 'City ID must be numbers',
          });
          return false;
        }
        return true;
      default:
        return false;
    }
  }

  resetState() {
    this.setState({
      title: '',
      entry: '',
      callParams: '',
      error: '',
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
        return(
          <h2>Uh oh - 'mode' not recognized in JournalEntry</h2>
        );
    }
  }

  getAPICallParam() {
    if (this.state.mode === CREATE) {
      return(
        <div>
          <label>Enter location by:</label><br></br>
          <input id={CITY_NAME}
            type="radio" name="weather"
            checked={this.state.callTypeAPI === CITY_NAME}
            onChange={this.handleChange} />
          <label>
            City Name (and optionally country code, separated by space)<br></br>
            (e.g. Toronto, CA)
          </label>
          <br></br>
          <input id={CITY_ID}
            type="radio" name="weather"
            checked={this.state.callTypeAPI === CITY_ID}
            onChange={this.handleChange} />
          <label>
            City ID<br></br>
            (e.g. 6167865)
          </label>
          <br></br>
          <input id="callParams"
            type="text" value={this.state.callParams}
            onChange={this.handleChange} />
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.setHeader()}
        <WeatherStamp id={this.props.match.params.id}
          isShow = {this.state.mode === EDIT} />
        <form onSubmit={this.handleSubmit}>
          <section id="journal">
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
          <section id="weather">
            {this.getAPICallParam()}
          </section>
          <input type="submit"></input>
          <div id="error">
            {this.state.error}
          </div>
        </form>
      </div>
    );
  }
}

export default JournalEntry;
