import React from 'react';

import { ButtonSubmit, Label } from '../../styles';
import { ToggleButton } from './styles';

const Settings = (props) => (
  <div>
    <h2>Settings</h2>
    <hr></hr>
    <div className="column">
      <div className="row">
        <div className="column">
          <Label>Using temperature unit: </Label>
        </div>
        <div className="columnCenter">
          <ToggleButton onClick={(e) => props.handleTempUnitToggle(e)}>
            <sup>°</sup>{props.tempUnit}
          </ToggleButton>
        </div>
      </div>
      <div className="row">
        <ButtonSubmit onClick={(e) => props.handleSettingsPost(e)}>
          Save settings
        </ButtonSubmit>
      </div>
      </div>
  </div>
);

export default Settings;
