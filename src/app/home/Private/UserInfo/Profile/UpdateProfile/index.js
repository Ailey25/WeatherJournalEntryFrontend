import React from 'react';
import { FIRSTNAME, LASTNAME } from '../../../../constants';

const UpdateProfile = (props) => (
	<div>
		<h2>Update profile</h2>
		<hr></hr>
		<form id="profile" onSubmit={(e) => props.handleProfilePost(e)}>
			<dl>
				<dt>
					<label htmlFor={FIRSTNAME}>First name:</label>
				</dt>
				<dd>
					<input id={FIRSTNAME}
						value={props.firstname}
						onChange={(e) => props.handleProfileChange(e)}>
					</input>
				</dd>
			</dl>
			<dl>
				<dt>
					<label htmlFor={LASTNAME}>Last name:</label>
				</dt>
				<dd>
					<input id={LASTNAME}
						value={props.lastname}
						onChange={(e) => props.handleProfileChange(e)}>
					</input>
				</dd>
			</dl>
			<input type="submit" value="Update profile"></input>
		</form>
	</div>
);

export default UpdateProfile;
