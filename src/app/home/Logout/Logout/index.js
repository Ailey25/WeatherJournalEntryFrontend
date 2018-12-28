import React from 'react';

const Logout = (props) => (
  <button id="logout"
    onClick={(e) => props.handleClick(e)}>Log out
  </button>
);

export default Logout;
