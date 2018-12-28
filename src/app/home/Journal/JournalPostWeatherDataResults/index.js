import React from 'react';

export const JournalPostWeatherDataResults = (props) => {
  if (props.isLoading) return <div>Loading results...</div>
  return <div>{props.message}</div>;
};

export default JournalPostWeatherDataResults;
