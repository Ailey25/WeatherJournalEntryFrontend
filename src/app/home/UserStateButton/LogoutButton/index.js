import React from 'react';

const LogoutButton = (props) => (
  <button id="logout"
    onClick={(e) => props.handleClick(e)}>Log out
  </button>
);

export default LogoutButton;
