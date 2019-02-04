import React from 'react';
import { FIRSTNAME, LASTNAME } from '../../../../constants';

import {
  LabelFor,
  Input,
  InputSubmit
} from '../../styles';

const UpdateProfile = (props) => (
  <div>
    <h2>{props.username}'s profile</h2>
    <hr></hr>
    <form id="profile" onSubmit={(e) => props.handleProfilePost(e)}>
      <div className="columnCenter">
        <LabelFor htmlFor={FIRSTNAME}>Edit first name</LabelFor>
        <Input id={FIRSTNAME}
          type="text"
          value={props.firstname}
          onChange={(e) => props.handleProfileChange(e)}
        />
        <LabelFor htmlFor={LASTNAME}>Edit last name</LabelFor>
        <Input id={LASTNAME}
          type="text"
          value={props.lastname}
          onChange={(e) => props.handleProfileChange(e)}
        />
        <InputSubmit type="submit" value="Update profile" />
      </div>
    </form>
  </div>
);

export default UpdateProfile;
