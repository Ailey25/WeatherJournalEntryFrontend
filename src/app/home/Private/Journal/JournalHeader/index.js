import React from 'react';
import { CREATE, EDIT } from '../../../constants'

export const JournalHeader= (props) => {
  switch (props.mode) {
    case CREATE:
      return (
        <h2>Creating Journal Entry</h2>
      );
    case EDIT:
      return(
        <h2>Editing Journal Entry</h2>
      );
    default:
      return(
        <h2>Uh oh - 'mode' not recognized in JournalEntry</h2>
      );
  }
};

export default JournalHeader;
