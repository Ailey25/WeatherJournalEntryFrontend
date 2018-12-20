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
import {
  validateCityName, validateCityId,
  setDataWeatherPostUrl
} from './utility';

class JournalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      entry: '',
      callType: CITY_NAME,
      callParamsString: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateJournalEntryList = this.updateJournalEntryList.bind(this);
    this.validateSubmission = this.validateSubmission.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    this.props.setErrorMessage('');
    if (this.props.match.params.mode === CREATE) {
      this.setState({
        id: uuidv4()
      });
    } else if (this.props.match.params.mode === EDIT) {
      let journal = this.props.getJournalEntry(this.props.match.params.id);
      this.setState({
        id: this.props.match.params.id,
        title: journal.title,
        entry: journal.entry,
        callType: CITY_ID,
      });
    } else {
      setErrorMessage('Journal mode not recognized');
    }
  }

  handleChange(e) {
    switch(e.currentTarget.id) {
      case 'title':
        this.setState({
            title: e.currentTarget.value,
        });
        break;
      case 'entry':
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
      case 'callParamsString':
        this.setState({
          callParamsString: e.currentTarget.value,
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
    //console.log('here: ' + this.state.callType + ': ' + this.state.callParamsString);
    if (this.props.match.params.mode === CREATE) {
      if (!this.validateSubmission()) return;
    }

    if (this.props.weatherObject === undefined) return;
    let fetchUrl = setDataWeatherPostUrl(
      this.props.match.params.mode,
      this.state.callType,
      this.state.id,
      this.state.callParamsString,
      this.props.weatherObject.cityId
    );

    await this.props.postWeatherData(fetchUrl);

    if (this.props.response.ok) {
      if (this.updateJournalEntryList()) {
        this.resetState();
      }
      this.props.setErrorMessage(
        'Journal entry edited/added!\
        Re-enter to see updated weather info\
        [Might add another page to redirect to later]'
      );
    } else {
      this.props.setErrorMessage('Journal entry could not be added - Invalid location');
    }
  }

  updateJournalEntryList() {
    let journalObject = {
      id: this.state.id,
      title: this.state.title,
      entry: this.state.entry,
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
    switch(this.state.callType) {
      case CITY_NAME:
        const isCityNameValid = validateCityName(this.state.callParamsString);
        if (isCityNameValid === 1) {
          return true;
        } else if (isCityNameValid === 2) {
          this.props.setErrorMessage(
            'Location value cannot be empty'
          );
        } else if (isCityNameValid === 3) {
          this.props.setErrorMessage(
            'Enter country code after comma or remove comma'
          );
        } else if (isCityNameValid === 4) {
          this.props.setErrorMessage(
            'City name and/or country code can only contain alphabets'
          );
        }
        return false;
      case CITY_ID:
        const isCityIdValid = validateCityId(this.state.callParamsString);
        if (isCityIdValid === 1) {
          return true;
        } else if (isCityNameValid === 2) {
          this.props.setErrorMessage(
            'Location value cannot be empty'
          );
        } else if (isCityIdValid === 4) {
          this.props.setErrorMessage('City ID must be numbers');
        }
        return false;
      default:
        return false;
    }
  }

resetState() {
  if (this.props.match.params.mode === CREATE) this.setState({ id: uuidv4() })
  this.setState({
    title: '',
    entry: '',
  });
  this.props.setErrorMessage('');
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
        />
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
          check={component.state.callType}
          callParamsString={component.state.callParamsString}
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
  weatherObject: state.weatherStampReducer.weatherObject,
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
