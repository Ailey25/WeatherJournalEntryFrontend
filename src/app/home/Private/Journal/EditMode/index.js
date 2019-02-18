import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';

import WeatherStampContainer from '../../WeatherStamp';
import JournalBody from '../JournalBody';
import WeatherLocationInput from '../WeatherLocationInput';
import JournalStatus from '../JournalStatus';
import { editJournal } from '../../../redux/actions/synchronous';
import {
  postWeatherData,
  setMessage as setWeatherMessage
} from '../../../redux/actions/weatherData';
import {
  postJournalList,
  setMessage as setJournalMessage
} from '../../../redux/actions/journalList';
import { EDIT, CITY_ID, CITY_NAME } from '../../../constants'
import {
  setDataWeatherPostUrl,
  getUserId,
} from '../../../utility';
import { APP_URL } from '../../../Routes/constants';

import { JournalStyle, InputSubmit, StyledLink, Label } from '../styles';

export class EditModeContainer extends Component {
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

    // set id to be existing id since it's EDIT mode
    let journal = this.getJournal(this.props.match.params.id);
    if (journal) {
      this.setState({
        id: this.props.match.params.id,
        title: journal.title,
        entry: journal.entry,
        callType: CITY_ID,
      });
    }
  }

  componentDidUpdate() {
    if (!(getUserId())) {
       this.props.history.push(APP_URL.HOME_TAB);
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
        this.props.setJournalMessage(
          'handleChange: current target id ' + e.currentTarget.id + ' not handled'
        );
        break;
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    if (!this.props.weatherObject) return;

    let fetchUrl = setDataWeatherPostUrl(
      EDIT,
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

    let userId = getUserId();
    this.editJournalEntries();
    this.resetState();

    await this.props.postJournalList(userId, this.props.journalList);
    if (!this.props.journalOk) {
      this.props.setJournalMessage('Journals could not be saved');
      return;
    }

    this.props.history.push(APP_URL.JOURNALS_TAB);
  }

  editJournalEntries = () => {
    let journal = {
      id: this.state.id,
      title: this.state.title,
      entry: this.state.entry,
      cityId: this.props.weatherObject.cityId,
    };

    this.props.editJournal(this.props.journalList, journal);
  }

  resetState = () => {
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
        <h2 id='journalHeader'>Editing journal entry</h2>
        <hr></hr>
        <WeatherStampContainer id={component.props.match.params.id} />
        <form onSubmit={(e) => component.handleSubmit(e)}>
          <JournalBody
            handleChange={(e) => component.handleChange(e)}
            title={component.state.title}
            entry={component.state.entry}
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
  editJournal: (journalList, journal) =>
    dispatch(editJournal(journalList, journal)),
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
  connect(mapStateToProps, mapDispatchToProps)(EditModeContainer)
);
