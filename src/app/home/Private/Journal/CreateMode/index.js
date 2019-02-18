import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import uuidv4 from 'uuid/v4';

import WeatherStampContainer from '../../WeatherStamp';
import JournalBody from '../JournalBody';
import WeatherLocationInput from '../WeatherLocationInput';
import JournalStatus from '../JournalStatus';
import { addJournal } from '../../../redux/actions/synchronous';
import {
  postWeatherData,
  setMessage as setWeatherMessage
} from '../../../redux/actions/weatherData';
import {
  postJournalList,
  setMessage as setJournalMessage
} from '../../../redux/actions/journalList';
import {
  CREATE,
  CITY_ID, CITY_NAME,
  CITY_NAME_VALIDATION_STATUS, CITY_NAME_VALIDATION_MESSAGE,
  CITY_ID_VALIDATION_STATUS, CITY_ID_VALIDATION_MESSAGE,
} from '../../../constants'
import {
  validateCityName,
  validateCityId,
  setDataWeatherPostUrl,
  getUserId,
} from '../../../utility';
import { APP_URL } from '../../../Routes/constants';

import { JournalStyle, InputSubmit, StyledLink, Label } from '../styles';

export class CreateModeContainer extends Component {
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
    this.props.setJournalMessage('');
    this.props.setWeatherMessage('');

    // set new ID since it's CREATE mode
    this.setState({
      id: uuidv4()
    });
  }

  componentDidUpdate() {
    if (!(getUserId())) {
       this.props.history.push(APP_URL.HOME_TAB);
    }
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
        this.props.setJournalMessage(
          'handleChange: current target id ' + e.currentTarget.id + ' not handled'
        );
        break;
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    if (!this.validateSubmission()) return;
    if (!this.props.weatherObject) return;
    let userId = getUserId();
    if (!userId) return;

    let fetchUrl = setDataWeatherPostUrl(
      CREATE,
      this.state.callType,
      this.state.id,
      this.state.callParamsString,
      this.props.weatherObject.cityId
    );

    await this.props.postWeatherData(fetchUrl);

    if (!this.props.weatherOk) {
      this.props.setWeatherMessage('Journal entry could not be added - Invalid location');
      return;
    }

    this.addToJournalEntries();
    this.resetState();

    await this.props.postJournalList(userId, this.props.journalList);

    if (!this.props.journalOk) {
      this.props.setJournalMessage('Journals could not be saved');
      return;
    }

    this.props.history.push(APP_URL.JOURNALS_TAB);
  }

  addToJournalEntries = () => {
    let journal = {
      id: this.state.id,
      title: this.state.title,
      entry: this.state.entry,
      cityId: this.props.weatherObject.cityId,
    };

    this.props.addJournal(this.props.journalList, journal);
  }

  validateSubmission = () => {
    switch(this.state.callType) {
      case CITY_NAME:
        const cityNameValidationStatus = validateCityName(this.state.callParamsString);
        if (cityNameValidationStatus === CITY_NAME_VALIDATION_STATUS.SUCCESS) return true;
        this.props.setJournalMessage(CITY_NAME_VALIDATION_MESSAGE[cityNameValidationStatus]);
        return false;
      case CITY_ID:
        const cityIdValidationStatus = validateCityId(this.state.callParamsString);
        if (cityIdValidationStatus === CITY_ID_VALIDATION_STATUS.SUCCESS) return true;
        this.props.setJournalMessage(CITY_ID_VALIDATION_MESSAGE[cityIdValidationStatus]);
        return false;
      default:
        return false;
    }
  }

  resetState = () => {
    this.setState({ id: uuidv4() });
    this.setState({
      title: '',
      entry: '',
    });
    this.props.setWeatherMessage('');
    this.props.setJournalMessage('');
  }

  render() {
    const component = this;
    return (
      <JournalStyle>
        <StyledLink to={APP_URL.JOURNALS_TAB}>Back to journal entries</StyledLink>
        <h2 id='journalHeader'>Creating journal entry</h2>
        <hr></hr>
        <form onSubmit={(e) => component.handleSubmit(e)}>
          <JournalBody
            handleChange={(e) => component.handleChange(e)}
            title={component.state.title}
            entry={component.state.entry}
          />
          <WeatherLocationInput
            isShow={true}
            handleChange={(e) => component.handleChange(e)}
            check={component.state.callType}
            callParamsString={component.state.callParamsString}
          />
          <InputSubmit type="submit" />
        </form>
        <Label example>Will automatically save journals</Label>
        <JournalStatus
          isPosting={component.props.journalIsPosting}
          messages={[
            component.props.weatherMessage,
            component.props.journalMessage
          ]}
        />
      </JournalStyle>
    );
  }
}

const mapStateToProps = (state) => ({
  weatherIsPosting: state.weatherReducer.isPosting,
  weatherObject: state.weatherReducer.weatherObject,
  weatherOk: state.weatherReducer.ok,
  weatherMessage: state.weatherReducer.message,
  journalIsPosting: state.journalListReducer.isPosting,
  journalList: state.journalListReducer.journalList,
  journalOk: state.journalListReducer.ok,
  journalMessage: state.journalListReducer.message,
});

const mapDispatchToProps = (dispatch) => ({
  addJournal: (journalList, journal) =>
    dispatch(addJournal(journalList, journal)),
  postWeatherData: (fetchUrl) =>
    dispatch(postWeatherData(fetchUrl)),
  setWeatherMessage: (message) =>
    dispatch(setWeatherMessage(message)),
  postJournalList: (id, journalList) =>
    dispatch(postJournalList(id, journalList)),
  setJournalMessage: (message) =>
    dispatch(setJournalMessage(message)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateModeContainer)
);
