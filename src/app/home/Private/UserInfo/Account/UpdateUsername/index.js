import React from 'react';
import { NEW_USERNAME } from '../../../../constants';

import { Input, InputSubmit } from '../../styles';

const UpdateUsername = (props) => (
  <div>
    <h2>Change username</h2>
    <hr></hr>
    <form onSubmit={(e) => props.handleUsernamePost(e)}>
      <div className="columnCenter">
        <Input id={NEW_USERNAME}
          type="text"
          placeholder="New username"
          value={props.newUsername}
          onChange={(e) => props.handleUsernameChange(e)}
        />
        <InputSubmit type="submit" value="Update username" />
      </div>
    </form>
  </div>
);

export default UpdateUsername;
