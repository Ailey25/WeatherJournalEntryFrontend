import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const JournalListStyle = styled.div`
  margin: 0.7rem;
  max-width: 100%;
`;

export const EntryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 1rem;
`;

export const TitleEntryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  max-width: 50rem;
  width: 100%;
  word-break: break-word;
`;

export const Label = styled.label`
  color: ${props => props.color === "faded" ? props.theme.faded : ''};
  font-size: ${props => props.type === "title" ? '' : '0.8em'};
`;

export const DeleteButton = styled.button`
  margin: 0 0.5rem
  border-radius: 5px
  font-size: 1.3em;
  color: ${props => props.theme.primaryLight};
  background: ${props => props.theme.warning};
  cursor: pointer;
`;

export const StyledLink = styled(Link)`
  color: ${props => props.theme.primaryDark};
  font-size: 1em;
  text-decoration: none;
`;

export const EditLink = styled(Link)`
  color: ${props => props.theme.primaryButtonDark};
  font-size: 1em;
  text-decoration: none;
`;
