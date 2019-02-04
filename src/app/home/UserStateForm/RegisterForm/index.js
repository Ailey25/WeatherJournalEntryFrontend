import React from 'react';
import {
  USERNAME,
  FIRSTNAME,
  LASTNAME,
  PASSWORD
} from '../../constants';

import { Input, InputSubmit } from '../styles';

const RegisterForm = (props) => (
  <form id="register" onSubmit={(e) => props.handleSubmit(e)}>
    <div className="columnCenter">
      <Input id={USERNAME}
        type="text"
        placeholder={'Username'}
        value={props.username}
        onChange={(e) => props.handleChange(e)}
      />
      <Input id={FIRSTNAME}
        type="text"
        placeholder={'First name'}
        value={props.firstname}
        onChange={(e) => props.handleChange(e)}
      />
      <Input id={LASTNAME}
        type="text"
        placeholder={'Last name'}
        value={props.lastname}
        onChange={(e) => props.handleChange(e)}
      />
      <Input id={PASSWORD}
        type="password"
        placeholder={'Password'}
        value={props.password}
        onChange={(e) => props.handleChange(e)}
      />
      <InputSubmit className="submitButton"
        type="submit" value="Register"
      />
    </div>
  </form>
);

export default RegisterForm;
