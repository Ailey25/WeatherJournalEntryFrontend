import React from 'react';
import styled, { css } from 'styled-components';

export const UserStateForm = styled.div`
  display: flex;
  justify-content: center;

  padding: 8rem 5rem 1rem 8rem;
`;

const userStateStyle = css`
  margin: 0.7rem;
  padding: 0.5rem 0.3rem;
  max-width: 100%;
  width: 25rem;
`;

export const Input = styled.input`${userStateStyle}`;

export const InputSubmit = styled(Input)`
  width: 26rem;
  border: 2px;
  border-style: hidden;
  border-radius: 3px;
`;
