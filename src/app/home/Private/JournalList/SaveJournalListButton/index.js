import React from 'react';

import { StyledButton } from './styles';

const SaveJournalListButton = (props) => (
  <StyledButton onClick={(e) => props.handleJournalListPost(e)}>
    Save
  </StyledButton>
);

export default SaveJournalListButton;
