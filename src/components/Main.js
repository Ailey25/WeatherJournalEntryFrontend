import React, { Component } from "react";
import { Route } from "react-router-dom";
import JournalEntry from "./JournalEntry.js";
import JournalEntryList from "./JournalEntryList.js";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      journalList: [],
    }
    this.addJournalEntry = this.addJournalEntry.bind(this);
    this.getJournalEntry = this.getJournalEntry.bind(this);
  }

  addJournalEntry(journalObject) {
    this.setState({
      journalList: [...this.state.journalList, journalObject]
    });
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
          let myGetJournalEntry = this.getJournalEntry;
          return (
            <JournalEntry key={props.match.params.mode} {...props}
              addJournalEntry = {myAddJournalEntry}
              getJournalEntry = {myGetJournalEntry} />
          );
        }} />
      </div>
    );
  }
}

export default Main;
