import React from 'react';
import { CREATE, EDIT, CITY_ID, CITY_NAME } from '../../../constants'

export const JournalPostWeatherDataInputs = (props) => {
  if (props.mode === EDIT) return null;
  return (
    <div>
      <form onSubmit={(e) => props.handleSubmit(e)}>
      <section id="weather">
        <label>Enter location by:</label><br></br>
        <input id={CITY_NAME}
          type="radio" name="weather"
          checked={props.check === CITY_NAME}
          onChange={(e) => props.handleChange(e)} />
        <label>
          City Name (and optionally country code, separated by space)<br></br>
          (e.g. Toronto, CA)
        </label>
        <br></br>
        <input id={CITY_ID}
          type="radio" name="weather"
          checked={props.check === CITY_ID}
          onChange={(e) => props.handleChange(e)} />
        <label>
          City ID<br></br>
          (e.g. 6167865)
        </label>
        <br></br>
        <input id="callParamsString"
          type="text" value={props.callParamsString}
          onChange={(e) => props.handleChange(e)} />
      </section>
      </form>
    </div>
  );
};

export default JournalPostWeatherDataInputs;
