import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';

import WeatherStampContainer from '../../WeatherStamp';
import JournalStatus from '../JournalStatus';
import { getUserId } from '../../../utility';
import { APP_URL } from '../../../Routes/constants';

import { JournalStyle, StyledLink, ViewTextArea } from '../styles';

export class ViewModeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      entry: '',
    };
  }

  componentDidMount() {
    // set id to be existing id since it's VIEW mode
    let journal = this.getJournal(this.props.match.params.id);
    if (journal) {
      this.setState({
        id: this.props.match.params.id,
        title: journal.title,
        entry: journal.entry,
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

  displayTitle = () => this.state.title || 'No title!';

  displayEntry = () => this.state.entry || 'No entry!';

  render() {
    const component = this;
    return (
      <JournalStyle>
        <StyledLink to={APP_URL.JOURNALS_TAB}>Back to journal entries</StyledLink>
        <h2 id='journalHeader'>{component.displayTitle()}</h2>
        <hr></hr>
        <div className="rowCenter">
          <WeatherStampContainer id={component.props.match.params.id} />
        </div>
        <div className="rowCenter">
          <ViewTextArea id="entry"
            rows="30" cols="100"
            value={component.displayEntry()} disabled
          />
        </div>
      </JournalStyle>
    );
  }
}

const mapStateToProps = (state) => ({
  journalList: state.journalListReducer.journalList,
});

export default withRouter(
  connect(mapStateToProps, null)(ViewModeContainer)
);
