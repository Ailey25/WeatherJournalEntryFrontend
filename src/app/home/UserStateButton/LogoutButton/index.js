import React from 'react';
import { StyledUserStateButton as Button } from '../styles';

const LogoutButton = (props) => (
  <Button id="logout"
    onClick={(e) => props.handleClick(e)}>Log out
  </Button>
);

export default LogoutButton;
