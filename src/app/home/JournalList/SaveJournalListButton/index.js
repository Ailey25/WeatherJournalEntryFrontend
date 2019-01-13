import React from 'react';

const SaveJournalListButton = (props) => (
  <button onClick={(e) => props.handleJournalListPost(e)}>
    Save Journals
  </button>
);

export default SaveJournalListButton;
