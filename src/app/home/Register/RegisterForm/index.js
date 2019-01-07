import React from 'react';
import {
  USERNAME,
  FIRSTNAME,
  LASTNAME,
  PASSWORD
} from '../../constants';

const RegisterForm = (props) => (
  <form id="register" onSubmit={(e) => props.handleSubmit(e)}>
    <label htmlFor={USERNAME}>Username: </label>
    <input id={USERNAME}
      type="text" value={props.username}
      onChange={(e) => props.handleChange(e)}
    />
    <br></br>
    <label htmlFor={FIRSTNAME}>First Name: </label>
    <input id={FIRSTNAME}
      type="text" value={props.firstname}
      onChange={(e) => props.handleChange(e)}
    />
    <br></br>
    <label htmlFor={LASTNAME}>Last Name: </label>
    <input id={LASTNAME}
      type="text" value={props.lastname}
      onChange={(e) => props.handleChange(e)}
    />
    <br></br>
    <label htmlFor={PASSWORD}>Password: </label>
    <input id={PASSWORD}
      type="password" value={props.password}
      onChange={(e) => props.handleChange(e)}
    />
    <br></br>
    <input type="submit" value="Register"></input>
  </form>
);

export default RegisterForm;
