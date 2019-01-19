import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import 'babel-polyfill';
import uuidv4 from 'uuid/v4';

import WeatherStampContainer from '../WeatherStamp/index';
import JournalHeader from './JournalHeader/index';
import JournalBody from './JournalBody/index';
import JournalPostWeatherDataInputs from './JournalPostWeatherDataInputs/index';
import JournalPostWeatherDataResults from './JournalPostWeatherDataResults/index';
import { setJournalMode, addJournal, editJournal } from '../redux/actions/synchronous';
import { postWeatherData, setErrorObject } from '../redux/actions/postWeatherAPI';
import {
  CREATE, EDIT,
  CITY_ID, CITY_NAME,
  BASE_URL,
  CITY_NAME_VALIDATION_STATUS, CITY_NAME_VALIDATION_MESSAGE,
  CITY_ID_VALIDATION_STATUS, CITY_ID_VALIDATION_MESSAGE,
} from '../constants'
import {
  validateCityName,
  validateCityId,
  setDataWeatherPostUrl,
  getUserId,
} from '../utility';

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
  }

  componentDidMount() {
    this.props.setErrorMessage('');
    if (this.props.match.params.mode === CREATE) {
      this.setState({
        id: uuidv4()
      });
    } else if (this.props.match.params.mode === EDIT) {

      let journal = this.getJournal(this.props.match.params.id);
      this.setState({
        id: this.props.match.params.id,
        title: journal.title,
        entry: journal.entry,
        callType: CITY_ID,
      });
    } else {
      this.props.setErrorMessage('Journal mode not recognized');
    }
  }

  componentDidUpdate() {
    if (!(getUserId())) {
       this.props.history.push("/");
    }
  }

  getJournal = (journalId) => {
    let object;
    this.props.journalList.forEach((elem) => {
      if (elem.id === journalId) {
        object = elem;
      }
    });
    return object;
  }

  handleChange = (e) => {
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

  handleSubmit = async (e) => {
    e.preventDefault();

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

    if (this.props.ok) {
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

  updateJournalEntryList = () => {
    let journal = {
      id: this.state.id,
      title: this.state.title,
      entry: this.state.entry,
      cityId: this.props.cityId,
    };

    switch(this.props.match.params.mode) {
      case CREATE:
        this.props.addJournal(this.props.journalList, journal);
        return true;
      case EDIT:
        this.props.editJournal(this.props.journalList, journal);
        return true;
      default:
        this.props.setErrorMessage('Journal entry mode not recognized');
        return false;
    }
  }

  validateSubmission = () => {
    switch(this.state.callType) {
      case CITY_NAME:
        const cityNameValidationStatus = validateCityName(this.state.callParamsString);
        if (cityNameValidationStatus === CITY_NAME_VALIDATION_STATUS.SUCCESS) return true;
        this.props.setErrorMessage(CITY_NAME_VALIDATION_MESSAGE[cityNameValidationStatus]);
        return false;
      case CITY_ID:
        const cityIdValidationStatus = validateCityId(this.state.callParamsString);
        if (cityIdValidationStatus === CITY_ID_VALIDATION_STATUS.SUCCESS) return true;
        this.props.setErrorMessage(CITY_ID_VALIDATION_MESSAGE[cityIdValidationStatus]);
        return false;
      default:
        return false;
    }
  }


  resetState = () => {
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
          message={component.props.message}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  journalList: state.journalListReducer.journalList,
  weatherObject: state.weatherStampReducer.weatherObject,
  cityId: state.journalReducer.cityId,
  isPosting: state.journalReducer.isPosting,
  ok: state.journalReducer.ok,
  message: state.journalReducer.message,
});

const mapDispatchToProps = (dispatch) => ({
  addJournal: (journalList, journal) =>
    dispatch(addJournal(journalList, journal)),
  editJournal: (journalList, journal) =>
    dispatch(editJournal(journalList, journal)),
  postWeatherData: (fetchUrl) =>
    dispatch(postWeatherData(fetchUrl)),
  setErrorMessage: (errorMessage) =>
    dispatch(setErrorObject({ message: errorMessage })),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JournalContainer)
);
