import React from 'react';
import { NEW_USERNAME } from '../../../../constants';

const UpdateUsername = (props) => (
	<div>
		<h2>Change username</h2>
		<hr></hr>
		<form onSubmit={(e) => props.handleUsernamePost(e)}>
			<dl>
				<dt>
					<label htmlFor={NEW_USERNAME}>New username:</label>
				</dt>
				<dd>
					<input id={NEW_USERNAME}
						value={props.newUsername}
						onChange={(e) => props.handleUsernameChange(e)}>
					</input>
				</dd>
			</dl>
			<input type="submit" value="Update username"></input>
		</form>
	</div>
);

export default UpdateUsername;
