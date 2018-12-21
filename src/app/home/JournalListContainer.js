import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import {
  addToJournalList,
  editJournalList
} from './redux/actions'
import { JournalList } from './JournalList';
import JournalContainer from './JournalContainer';
import SettingsContainer from './SettingsContainer';

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
        <Route exact path="/" render={() => (
          <JournalList journalList={component.props.journalList} />
        )} />
        <Route path="/journal-entry/:mode/:id?" render={(props) => (
          <JournalContainer key={props.match.params.mode} {...props}
            addJournalEntry = {component.addJournal}
            editJournalEntry = {component.editJournal}
            getJournalEntry = {component.getJournal} />
        )} />
        <Route path ="/settings" render={() => (
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
