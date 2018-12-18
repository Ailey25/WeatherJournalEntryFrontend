import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import {
  addToJournalList,
  editJournalList
} from './redux/actions'
import { JournalList } from './JournalList';
import JournalContainer from './JournalContainer';

class JournalListContainer extends Component {
  addJournal(journalObject) {
    this.props.onAddToJournalList(journalObject);
  }

  editJournal(journalObject) {
    let index = this.props.journalList.findIndex(j => j.id === journalObject.id);
    if (index != -1) {
      this.props.onEditJournalList(journalObject, index);
    } // object's id doesn't exist in journalList
  }

  getJournal(journalId) {
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
        <Route exact path="/" render={() => {
          return (
            <JournalList journalList={component.props.journalList} />
          );
        }} />
        <Route path="/journal-entry/:mode/:id?" render={(props) => {
          return (
            <JournalContainer key={props.match.params.mode} {...props}
              addJournalEntry = {component.addJournal.bind(component)}
              editJournalEntry = {component.editJournal.bind(component)}
              getJournalEntry = {component.getJournal.bind(component)} />
          );
        }} />
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
