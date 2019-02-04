import React from 'react';
import styled, { css } from 'styled-components';

import { ButtonStyle } from '../../styles';

export const ToggleButton = styled(ButtonStyle)`
  padding: 0.5rem;
  border: 2px solid ${props => props.theme.primaryButtonDark};
  border-radius: 5px;

  color: ${props => props.theme.primaryLight};
  background: ${props => props.theme.primaryButtonLight}
`;
