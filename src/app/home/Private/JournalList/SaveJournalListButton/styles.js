import React from 'react';
import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  margin: 0.3rem 0.7rem;
  padding: 0.4rem;
  border-color: ${props => props.theme.primaryButtonDark};
  border-radius: 5px;

  max-height: 2rem;
  font-size: 1em;
  font-family: Arial, Verdana, sans-serif;

  color: ${props => props.theme.primaryLight};
  background: ${props => props.theme.primaryButtonLight};
  cursor: pointer;
`;
