import React from 'react';
import { OLD_PASSWORD, NEW_PASSWORD, CONFIRM_PASSWORD } from '../../../constants';

const UpdatePassword = (props) => (
	<div>
		<h2>Change password</h2>
		<hr></hr>
		<form onSubmit={(e) => props.handlePasswordPost(e)}>
			<dl>
				<dt>
					<label htmlFor={OLD_PASSWORD}>Old password:</label>
				</dt>
				<dd>
					<input id={OLD_PASSWORD}
						value={props.oldPassword}
						onChange={(e) => props.handlePasswordChange(e)}>
					</input>
				</dd>
			</dl>
			<dl>
				<dt>
					<label htmlFor={NEW_PASSWORD}>New password:</label>
				</dt>
				<dd>
					<input id={NEW_PASSWORD}
						value={props.newPassword}
						onChange={(e) => props.handlePasswordChange(e)}>
					</input>
				</dd>
			</dl>
			<dl>
				<dt>
					<label htmlFor={CONFIRM_PASSWORD}>Confirm new password:</label>
				</dt>
				<dd>
					<input id={CONFIRM_PASSWORD}
						value={props.confirmPassword}
						onChange={(e) => props.handlePasswordChange(e)}>
					</input>
				</dd>
			</dl>
			<input type="submit" value="Update password"></input>
		</form>
	</div>
);

export default UpdatePassword;
