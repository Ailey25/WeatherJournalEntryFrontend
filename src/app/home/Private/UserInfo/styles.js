import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const UserInfoStyle = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0.7rem;
  max-width: 100%;
`;

const LabelStyle = styled.label`
  margin: 0.7rem 0;
  max-width: inherit;
  width: 15rem;
`;

export const LabelFor = styled(LabelStyle)`
  margin-bottom: 0;
  padding-bottom: 0;
  font-size: 0.8em;
`;

export const Label = styled(LabelStyle)`
  color: ${props => props.warning ? props.theme.warning : 'inherit'}
`;

const InputStyle = styled.input`
  margin: 0.3rem 0;
  padding: 0.4rem;
  max-width: inherit;
  width: 15rem;
`;

export const Input = styled(InputStyle)``;

export const InputSubmit = styled(InputStyle)`
  width: 16rem;
  border: 2px;
  border-style: hidden;
  border-radius: 3px;
`;

export const ButtonStyle = styled.button`
  margin: 0.3rem 0;
  padding: 0.4rem;

  color: ${props => props.theme.primaryLight};
  background: ${props => props.theme.primaryDark};
  cursor: pointer;
`;

export const ButtonSubmit = styled(ButtonStyle)`
  width: 16rem;
  font-size: 1em;
  font-family: Arial, Verdana, sans-serif;
`;

export const StyledLink = styled(Link)`
  color: ${props => props.theme.primaryDark};
  font-size: 1em;
  text-decoration: none;
`;
