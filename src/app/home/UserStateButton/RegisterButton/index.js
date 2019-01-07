import React from 'react';

const RegisterButton = (props) => (
  <div>
    <label>You're currently not logged in </label>
    <button id="register"
      onClick={(e) => props.handleClick(e)}>Register an account
    </button>
  </div>
);

export default RegisterButton;
