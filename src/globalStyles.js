import React from 'react';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = () => (
  <span>
    <Input />
    <InputSubmit />
    <HorizontalLine />
  </span>
);

const Input = createGlobalStyle`
  input {
    max-width: 100%;
    font-size: 1em;
    font-family: Arial, Verdana, sans-serif;
  }
`;

const InputSubmit = createGlobalStyle`
  input[type="submit"] {
    color: ${props => props.theme.primaryLight};
    background: ${props => props.theme.primaryDark};
    cursor: pointer;
  }
`;

const HorizontalLine = createGlobalStyle`
	hr {
		margin: 0 0 1rem 0;
		align-self: stretch;
	}
`;
