import React from 'react';

export const JournalStatus = (props) => {
  if (props.isPosting) return <div>Loading results...</div>
  if (!props.messages) return <div></div>;

  let displayMessages = (messages) => {
    return messages.map((message, index) =>
      <div key={index}>{message}</div>
    );
  };

  return (
    <div>{displayMessages(props.messages)}</div>
  );
};

export default JournalStatus;
