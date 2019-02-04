import React from 'react';
import { OLD_PASSWORD, NEW_PASSWORD, CONFIRM_PASSWORD } from '../../../../constants';

import { LabelFor, Input, InputSubmit } from '../../styles';

const UpdatePassword  = (props) => (
  <div>
    <h2>Change password</h2>
    <hr></hr>
    <form id="profile" onSubmit={(e) => props.handlePasswordPost(e)}>
      <div className="columnCenter">
        <LabelFor htmlFor={OLD_PASSWORD}>Old password</LabelFor>
        <Input id={OLD_PASSWORD}
          type="password"
          value={props.oldPassword}
          onChange={(e) => props.handlePasswordChange(e)}
        />
        <LabelFor htmlFor={NEW_PASSWORD}>New password</LabelFor>
        <Input id={NEW_PASSWORD}
          type="password"
          value={props.newPassword}
          onChange={(e) => props.handlePasswordChange(e)}
        />
        <LabelFor htmlFor={CONFIRM_PASSWORD}>Confirm new password</LabelFor>
        <Input id={CONFIRM_PASSWORD}
          type="password"
          value={props.confirmPassword}
          onChange={(e) => props.handlePasswordChange(e)}
        />
        <InputSubmit type="submit" value="Update password" />
      </div>
    </form>
  </div>
);

export default UpdatePassword;
