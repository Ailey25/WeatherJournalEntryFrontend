import React from 'react';
import { Link } from 'react-router-dom';

const JournalList = (props) => {
  if (props.journalList.length === 0) {
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
          { // list of journal entries
            props.journalList.map((journal) => (
              <li key={journal.id}>
                <span>
                  <label>{journal.title} </label>
                  <Link to={'/private/journal-entry/edit/' + journal.id}>Edit</Link>
                </span>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default JournalList;
