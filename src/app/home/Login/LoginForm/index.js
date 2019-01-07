import React from 'react';
import { USERNAME, PASSWORD } from '../../constants';

const LoginForm = (props) => (
  <form id="login" onSubmit={(e) => props.handleSubmit(e)}>
    <label htmlFor={USERNAME}>Username: </label>
    <input id={USERNAME}
      value={props.username}
      onChange={(e) => props.handleChange(e)}
    />
    <br></br>
    <label htmlFor={PASSWORD}>Password: </label>
    <input id={PASSWORD}
      type="password" value={props.password}
      onChange={(e) => props.handleChange(e)}
    />
    <br></br>
    <input type="submit" value="Login"></input>
  </form>
);

export default LoginForm;
