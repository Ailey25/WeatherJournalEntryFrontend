import React from 'react';
import { Link } from 'react-router-dom';

import { APP_URL } from '../../../Routes/constants';

import {
  EntryContainer,
  TitleEntryContainer,
  Label,
  DeleteButton,
} from '../styles';
import { EditLink } from '../styles';

const JournalList = (props) => {
  if (props.isLoading) {
    return (<label>Loading journals...</label>);
  }

  let formatTitle = (journalTitle) => {
    if (journalTitle.length === 0) {
      return (
        <Label type="title" color="faded">
          No title! Add titles for recognizable journal entries
        </Label>
      );
    }

    return (<Label type="title">{journalTitle}</Label>);
  };

  let formatEntry = (journalEntry) => {
    if (journalEntry.length === 0) {
      return (
        <Label type="entry" color="faded">
          No entry! Click edit to add one one
        </Label>);
    } else if (journalEntry.length > 100) {
      return (
        <Label type="entry">
          {journalEntry.substring(0, 100) + '...'}
        </Label>
      );
    }

    return (<Label type="entry">{journalEntry}</Label>);
  };

  let displayJournals = (journals) => {
    if (journals === undefined || journals.length === 0) {
      return (<label>No journal entries!</label>);
    }

    let list = journals.map((journal) => {
      return (
        <EntryContainer key={journal.id}>
          <TitleEntryContainer id={journal.id}
            onClick={(e) => props.handleJournalClick(e)}
          >
            {formatTitle(journal.title)}
            {formatEntry(journal.entry)}
          </TitleEntryContainer>
          <div className="columnCenter">
            <div className="row">
              <EditLink to={APP_URL.JOURNALS_TAB + '/edit/' + journal.id}>Edit</EditLink>
              <DeleteButton id={journal.id}
                onClick={(e) => props.handleJournalDelete(e)}
              >
                x
              </DeleteButton>
            </div>
          </div>
        </EntryContainer>
      )
    });

    return (<div>{list}</div>);
  };

  return(
    <div className="rowCenter">
      {displayJournals(props.journalList)}
    </div>
  );
}

export default JournalList;
