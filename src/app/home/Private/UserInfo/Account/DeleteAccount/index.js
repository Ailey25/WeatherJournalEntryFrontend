import React from 'react';
import { DELETE_ACCOUNT } from '../../../../constants';

import { ButtonSubmit, Label } from '../../styles';

const DeleteAccount = (props) => (
  <div>
    <h2>Delete account</h2>
    <hr></hr>
    <div className="columnCenter">
      <Label warning>This action is non-reversible</Label>
      <ButtonSubmit id={DELETE_ACCOUNT}
        onClick={(e) => props.handleDeleteAccountPost(e)}>
        Delete account
      </ButtonSubmit>
    </div>
  </div>
);

export default DeleteAccount;
