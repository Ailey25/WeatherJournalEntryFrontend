import React from 'react';

export const ToggleTemperatureUnit = (props) => (
  <div>
    <label>Using temperature unit: </label>
    <button id="tempUnit" onClick={(e) => props.handleClick(e)}>
      <sup>°</sup>{props.tempUnit}
    </button>
  </div>
);
