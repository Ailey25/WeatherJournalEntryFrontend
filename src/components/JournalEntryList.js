import React, { Component } from "react";
import { Link } from "react-router-dom";

class JournalEntryList extends React.Component {
  constructor(props) {
    super(props);
    this.getJournalTitles = this.getJournalTitles.bind(this);
  }

  getJournalTitles() {
    const titles = this.props.journalEntryList.map((journal) => {
      return(
        <li key={journal.id}>
          <span>
            <label>id: {journal.id} - </label>
            <label>{journal.title} - </label>
            <Link to='/journal-entry/edit'>Edit</Link>
          </span>
        </li>
      );
    });
    return titles;
  }

  render() {
    if (this.props.journalEntryList.length == 0) {
      return (
        <div>
          <h2>Available Journal Entries</h2>
          <label>No journal entries!</label>
        </div>
      );
    } else {
      return(
        <div>
          <h2>Available Journal Entries</h2>
          <ul>
            {this.getJournalTitles()}
          </ul>
        </div>
      );
    }
  }
}

export default JournalEntryList
