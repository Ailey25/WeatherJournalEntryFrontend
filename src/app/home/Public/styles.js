import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MainNavMenu = styled.div`
  background: ${props => props.theme.primaryDark};

  color: ${props => props.theme.primaryLight};
  font-family: Arial, sans-serif;
`;

export const HomeStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;

export const NavBarLink = styled(Link)`
  margin: 0 1rem;
  color: ${props => props.theme.primaryLight};
  text-decoration: none;
`;

export const Label = styled.label`
  font-size: 1.6em;
  color: ${props => props.theme.primaryDark};
`;

export const StyledLink = styled(Link)`
  font-size: 1.4em;
  font-weight: bold;
  color: blue;
  text-decoration: none;
`;
