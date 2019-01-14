import React from 'react';

const Settings = (props) => (
  <div>
		<h2>Settings</h2>
    <hr></hr>
    <label>Using temperature unit: </label>
    <button onClick={(e) => props.handleTempUnitToggle(e)}>
      <sup>°</sup>{props.tempUnit}
    </button>
    <br></br>
    <button onClick={(e) => props.handleSettingsPost(e)}>
      Save settings
    </button>
  </div>
);

export default Settings;
