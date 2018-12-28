import React from 'react';

export const JournalBody = (props) => {
  return(
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
  )
};

export default JournalBody;
