import React from 'react';

import { Input, TextArea } from '../styles';

export const JournalBody = (props) => {
  return(
    <form onSubmit={(e) => props.handleSubmit(e)}>
      <div className="column">
        <Input id="title"
          placeholder="Journal title"
          value={props.title}
          onChange = {(e) => props.handleChange(e)}
        />
        <TextArea id="entry"
          rows="10" cols="50"
          placeholder="Journal entry"
          value={props.entry}
          onChange={(e) => props.handleChange(e)}>
        </TextArea>
      </div>
    </form>
  )
};

export default JournalBody;
