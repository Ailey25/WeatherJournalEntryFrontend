import React from 'react';
import { USERNAME, PASSWORD } from '../../constants';

import { Input, InputSubmit } from '../styles';

const LoginForm = (props) => (
  <form id="login" onSubmit={(e) => props.handleSubmit(e)}>
    <div className="columnCenter">
      <Input id={USERNAME}
        type="text"
        placeholder={'Username'}
        value={props.username}
        onChange={(e) => props.handleChange(e)}
      />
      <Input id={PASSWORD}
        type="password"
        placeholder={'Password'}
        value={props.password}
        onChange={(e) => props.handleChange(e)}
      />
      <InputSubmit className="submitButton"
        type="submit" value="Login"
      />
    </div>
  </form>
);

export default LoginForm;
