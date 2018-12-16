import React, { Component } from "react";
import { Route } from "react-router-dom";
import { JournalEntryList } from './JournalEntryList.js';
import JournalEntryContainer from './JournalEntryContainer.js';

class JournalEntryListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journalList: [],
    }
    this.addJournalEntry = this.addJournalEntry.bind(this);
    this.editJournalEntry = this.editJournalEntry.bind(this);
    this.getJournalEntry = this.getJournalEntry.bind(this);
  }

  addJournalEntry(journalObject) {
    //console.log('add: ' + journalObject + ' ' + journalObject.id);
    this.setState({
      journalList: [...this.state.journalList, journalObject]
    });
  }

  editJournalEntry(journalObject) {
    let index = this.state.journalList.findIndex(j => j.id === journalObject.id);
    if (index != -1) {
      this.setState({
        journalList: [
          ...this.state.journalList.slice(0, index),
          journalObject,
          ...this.state.journalList.slice(index+1)
        ]
      });
    } // object's id doesn't exist in journalList
  }

  getJournalEntry(journalId) {
    let object;
    this.state.journalList.forEach((elem) => {
      if (elem.id === journalId) {
        object = elem;
      }
    });
    return object;
  }

  render() {
    return (
      <div>
      <Route exact path="/" render={() => {
          let myJournalList = this.state.journalList;
          return (
            <JournalEntryList journalList={myJournalList} />
          );
        }} />
        <Route path="/journal-entry/:mode/:id?" render={(props) => {
          let myAddJournalEntry = this.addJournalEntry;
          let myEditJournalEntry = this.editJournalEntry;
          let myGetJournalEntry = this.getJournalEntry;
          return (
            <JournalEntryContainer key={props.match.params.mode} {...props}
              addJournalEntry = {myAddJournalEntry}
              getJournalEntry = {myGetJournalEntry}
              editJournalEntry = {myEditJournalEntry} />
          );
        }} />
      </div>
    );
  }
}


export default JournalEntryListContainer;
