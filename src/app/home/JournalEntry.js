import React from "react";
import {
  CREATE, EDIT, CITY_ID, CITY_NAME
} from './constants.js'

const JournalEntryHeader= (props) => {
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
}

const JournalEntryBody = (props) => {
  return (
    <div>
      <form onSubmit={(e) => props.handleSubmit(e)}>
        <section id="journal">
          <input id="title"
            placeholder="Enter journal title"
            value={props.title}
            onChange = {(e) => props.handleChange(e)}>
          </input>
        </section>
        <section>
          <textarea id="entry"
            rows="10" cols="50"
            placeholder="Your journal entry"
            value={props.entry}
            onChange={(e) => props.handleChange(e)}>
          </textarea>
        </section>
      </form>
    </div>
  );
}

const JournalEntryAPI = (props) => {
  if (props.mode === EDIT) return null;
  return (
    <div>
      <form onSubmit={(e) => props.handleSubmit(e)}>
      <section id="weather">
        <label>Enter location by:</label><br></br>
        <input id={CITY_NAME}
          type="radio" name="weather"
          checked={props.callType === CITY_NAME}
          onChange={(e) => props.handleChange(e)} />
        <label>
          City Name (and optionally country code, separated by space)<br></br>
          (e.g. Toronto, CA)
        </label>
        <br></br>
        <input id={CITY_ID}
          type="radio" name="weather"
          checked={props.callType === CITY_ID}
          onChange={(e) => props.handleChange(e)} />
        <label>
          City ID<br></br>
          (e.g. 6167865)
        </label>
        <br></br>
        <input id="callParams"
          type="text" value={props.callParams}
          onChange={(e) => props.handleChange(e)} />
      </section>
      </form>
    </div>
  );
}

export {
  JournalEntryHeader,
  JournalEntryBody,
  JournalEntryAPI,
}
