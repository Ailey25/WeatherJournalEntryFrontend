import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import { addToJournalList, editJournalList } from '../redux/actions/actions';
import JournalList from './JournalList/index';
import JournalContainer from '../Journal/index';
import SettingsContainer from '../Settings/index';

class JournalListContainer extends Component {
  addJournal = (journalObject) => {
    this.props.onAddToJournalList(journalObject);
  }

  editJournal = (journalObject) => {
    let index = this.props.journalList.findIndex(j => j.id === journalObject.id);
    if (index != -1) {
      this.props.onEditJournalList(journalObject, index);
    } // object's id doesn't exist in journalList
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

  render() {
    const component = this;
    return (
      <div>
        <ul>
          <li><Link to="/private">See all journal entries</Link></li>
          <li><Link to="/private/journal-entry/create">Create new journal entry</Link></li>
          <li><Link to="/private/settings">Settings</Link></li>
        </ul>
        <Route exact path="/private" render={() => (
          <JournalList journalList={component.props.journalList} />
        )} />
        <Route path="/private/journal-entry/:mode/:id?" render={(props) => (
          <JournalContainer key={props.match.params.mode} {...props}
            addJournalEntry = {component.addJournal}
            editJournalEntry = {component.editJournal}
            getJournalEntry = {component.getJournal} />
        )} />
        <Route path ="/private/settings" render={() => (
          <SettingsContainer />
        )} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  journalList: state.journalListReducer.journalList,
});

const mapDispatchToProps = (dispatch) => ({
  onAddToJournalList: (journalObject) =>
    dispatch(addToJournalList(journalObject)),
  onEditJournalList: (journalObject, index) =>
    dispatch(editJournalList(journalObject, index)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JournalListContainer)
);
