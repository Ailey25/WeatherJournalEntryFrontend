import React from 'react';
import { DELETE_ACCOUNT } from '../../../../constants';

const DeleteAccount = (props) => (
	<div>
		<h2>Delete account</h2>
		<hr></hr>
    <label>This action is non-reversible</label>
    <br></br>
    <button id={DELETE_ACCOUNT} onClick={(e) => props.handleDeleteAccountPost(e)}>
			Delete account
		</button>
	</div>
);

export default DeleteAccount;
