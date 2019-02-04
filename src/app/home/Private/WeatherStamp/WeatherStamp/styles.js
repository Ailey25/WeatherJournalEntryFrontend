import React from 'react';
import styled, { css } from 'styled-components';

export const WeatherStampStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: 100%;
  width: 26rem;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column:
  justify-content: center;

  min-width: 3rem;
  max-width: 3rem;
`;

export const Label = styled.label`
  max-width: 6rem;
  font-size: ${props => props.size? props.size : ''};
  word-wrap: break-word;
`;
