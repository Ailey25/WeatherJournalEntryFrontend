import React from 'react';

const LoginForm = (props) => (
  <form onSubmit={(e) => props.handleSubmit(e)}>
    Username: <input id="username" />
    <br></br>
    Password: <input id="password" />
    <br></br>
    <input type="submit" value="Login"></input>
  </form>
);

export default LoginForm;
