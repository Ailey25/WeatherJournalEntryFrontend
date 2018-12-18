import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import 'babel-polyfill';
import uuidv4 from 'uuid/v4';

import WeatherStampContainer from "./WeatherStampContainer";
import {
  CREATE, EDIT, CITY_ID, CITY_NAME, BASE_URL,
} from './constants'
import {
  JournalHeader,
  JournalBody,
  JournalPostWeatherDataInputs,
  JournalPostWeatherDataResults,
} from './Journal';
import { setJournalMode } from './redux/actions';
import { postWeatherData, setErrorObject } from './redux/postWeatherAPIActions';

class JournalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      entry: '',
      callType: CITY_NAME,
      callParams: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setWeatherObjectId = this.setWeatherObjectId.bind(this);
    this.setFetchUrl = this.setFetchUrl.bind(this);
    this.updateJournalEntryList = this.updateJournalEntryList.bind(this);
    this.validateSubmission = this.validateSubmission.bind(this);
    this.resetState = this.resetState.bind(this);
    this.setCityId = this.setCityId.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.mode === EDIT) {
      let journalEntry = this.props.getJournalEntry(this.props.match.params.id);
      if (journalEntry !== undefined) {
        this.setState({
          title: journalEntry.title,
          entry: journalEntry.entry,
        });
      }
    }
  }

  handleChange(e) {
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
          callType: CITY_NAME,
        });
        break;
      case CITY_ID:
        this.setState({
          callType: CITY_ID,
        });
        break;
      case 'callParams':
        this.setState({
          callParams: e.currentTarget.value,
        });
        break;
      default:
        this.props.setErrorMessage(
          'handleChange: current target id ' + e.currentTarget.id + ' not handled'
        );
        break;
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    //console.log('here: ' + this.state.callType + ': ' + this.state.callParams);
    if (this.props.match.params.mode=== CREATE) {
      if (!this.validateSubmission()) return;
    }

    let weatherObjectId = this.setWeatherObjectId();
    let fetchUrl = this.setFetchUrl(weatherObjectId);
    if (fetchUrl === '') return

    await this.props.postWeatherData(fetchUrl);

    if (this.props.response.ok) {
      if (this.updateJournalEntryList(weatherObjectId)) {
        this.resetState();
      }
      this.props.setErrorMessage(
        'Journal entry edited/added (re-enter to see updated weather info)\
        - Might add another page to redirect to later'
      );
    } else {
      this.props.setErrorMessage('Journal entry could not be added - Invalid location');
    }
  }

  setWeatherObjectId() {
    let weatherObjectId = '';
    if (this.props.match.params.mode === CREATE) {
      weatherObjectId = uuidv4();
    } else if (this.props.match.params.mode === EDIT) {
      weatherObjectId = this.props.match.params.id;
    } else {
      setErrorMessage('Journal entry mode not recognized');
    }
    return weatherObjectId;
  }

  setFetchUrl(weatherObjectId) {
    let fetchUrl = BASE_URL;
    if (this.props.match.params.mode === EDIT) {
       if (this.state.cityid === '') {
         this.props.setErrorMessage('Try again in a few seconds');
         return '';
       } else {
         fetchUrl += '/' + CITY_ID + '/' + weatherObjectId +
                     '/' + this.state.cityid;
         return fetchUrl;
       }
     } else if (this.props.match.params.mode === CREATE) {
        let params = this.state.callParams.split(',').map(param => {
          return param.trim().replace(/\s\s+/g, ' ');
        });
        switch(this.state.callType) {
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
            this.props.setErrorMessage('API call param not recognized');
            return '';
        }
      }
  }

  updateJournalEntryList(weatherObjectId) {
    let journalObject = {
      title: this.state.title,
      entry: this.state.entry,
      id: weatherObjectId,
    };
    switch(this.props.match.params.mode) {
      case CREATE:
        this.props.addJournalEntry(journalObject);
        return true;
      case EDIT:
        this.props.editJournalEntry(journalObject);
        return true;
      default:
        this.props.setErrorMessage('Journal entry mode not recognized');
        return false;
    }
  }

  validateSubmission() {
    // Check for empty param
    if (this.state.callParams.length == 0) {
      this.props.setErrorMessage('Location value cannot be empty');
      return false;
    }

    switch(this.state.callType) {
      case CITY_NAME:
        let alphabetsCheck = /^[a-z][a-z/\s,]*$/i.test(this.state.callParams);
        let commaCheck = /^[^,]+,[^,]+$/.test(this.state.callParams);
        if (this.state.callParams.indexOf(',') != -1) {
          if (!commaCheck) {
            this.props.setErrorMessage(
              'Enter country code after comma or remove comma'
            );
            return false;
          }
        }
        if (!(alphabetsCheck)) {
          this.props.setErrorMessage(
            'City name and/or country code can only contain alphabets'
          );
          return false;
        }
        return true;
      case CITY_ID:
        let numbersCheck = /^[0-9]+$/.test(this.state.callParams);
        if (!numbersCheck) {
          this.props.setErrorMessage('City ID must be numbers')
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
    });
    this.props.setErrorMessage('');
  }

  setCityId(cityId) {
    this.setState({ cityid: cityId });
  }

  render() {
    const component = this;
    return (
      <div>
        <JournalHeader
          mode={component.props.match.params.mode}
        />
        <WeatherStampContainer id={component.props.match.params.id}
          mode={component.props.match.params.mode}
          setCityId={component.setCityId} />
        <JournalBody
          handleSubmit={(e) => component.handleSubmit(e)}
          handleChange={(e) => component.handleChange(e)}
          title={component.state.title}
          entry={component.state.entry}
        />
        <JournalPostWeatherDataInputs
          mode={component.props.match.params.mode}
          handleSubmit={(e) => component.handleSubmit(e)}
          handleChange={(e) => component.handleChange(e)}
          callType={component.state.callType}
          callParams={component.state.callParams}
        />
        <form onSubmit={this.handleSubmit}>
        <input type="submit"></input>
        </form>
        <JournalPostWeatherDataResults
          isLoading={component.props.isPosting}
          message={component.props.error.message}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isPosting: state.journalReducer.isPosting,
  response: {
    ok: state.journalReducer.response.ok,
  },
  error: {
    status: state.journalReducer.error.status,
    message: state.journalReducer.error.message,
  }
});

const mapDispatchToProps = (dispatch) => ({
  // setJournalMode: (mode) =>
  //   dispatch(setJournalMode(mode)),
  postWeatherData: (fetchUrl) =>
    dispatch(postWeatherData(fetchUrl)),
  setErrorMessage: (errorMessage) =>
    dispatch(setErrorObject({status:'', message: errorMessage})),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JournalContainer)
);
