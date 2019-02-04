import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const JournalStyle = styled.div`
  margin: 0.7rem;
  max-width: 100%;
`;

export const inputTextStyle = css`
  margin-top: 0.8rem;
  margin-bottom: 0.3rem;
  padding: 0.4rem;
  max-width: 95%;
  width: 25rem;
  min-height: 1rem;
  font-family: Arial, Verdana, sans-serif;
`;

const TextAreaStyle = styled.textarea`${inputTextStyle}`;

const InputStyle = styled.input`${inputTextStyle}`;

export const TextArea = styled(TextAreaStyle)`
  font-size: 0.8em;
`;

export const Input = styled(InputStyle)`
  font-size: ${props => props.small ? '0.8rem' : ''};
`;

export const InputRadio = styled(InputStyle)`
  width: 1.8rem;
`;

export const InputSubmit = styled(InputStyle)`
  width: 26rem;
  border: 2px;
  border-style: hidden;
  border-radius: 3px;
`;

export const Label = styled.label`
  font-size: ${props =>
    props.example
      ? '0.8em'
      : '1em'
  };
  margin-top: ${props =>
    props.example
      ? '0'               // no margin-top
      : `0.3rem`          // keep top margin same
  };
  margin-bottom: ${props =>
    props.example
      ? `0.3rem`          // keep bot margin same
      : '0'               // no margin-bottom
  };
`;

export const StyledLink = styled(Link)`
  color: ${props => props.theme.primaryDark};
  font-size: 1em;
  text-decoration: none;
`;
