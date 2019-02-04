import React from 'react';
import { StyledUserStateButton as Button } from '../styles';

const RegisterButton = (props) => (
  <div>
    <label>You're currently not logged in </label>
    <Button id="register"
      onClick={(e) => props.handleClick(e)}>Register an account
    </Button>
  </div>
);

export default RegisterButton;
