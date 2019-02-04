import React from 'react';
import { CREATE, EDIT, CITY_ID, CITY_NAME } from '../../../constants'

import { InputRadio, Label, Input } from '../styles';

export const JournalPostWeatherDataInputs = (props) => {
  if (props.mode === EDIT) return null;
  return (
    <div>
      <form onSubmit={(e) => props.handleSubmit(e)}>
        <section id="weather" className="column">
          <Label>Enter location for weather data:</Label>
          <Label example>e.g. Toronto, CA OR 6167865</Label>
          <div className="row">
            <div className="columnCenter">
              <InputRadio id={CITY_NAME}
                type="radio" name="weather"
                checked={props.check === CITY_NAME}
                onChange={(e) => props.handleChange(e)}
              />
            </div>
            <div className="columnCenter">
              <Label htmlFor={CITY_NAME}>
                City name, country code [optional]
              </Label>
              <Label example htmlFor={CITY_NAME}>
                Include country code for unambiguous weather data
              </Label>
            </div>
          </div>
          <div className="row">
            <div className="columnCenter">
              <InputRadio id={CITY_ID}
                type="radio" name="weather"
                checked={props.check === CITY_ID}
                onChange={(e) => props.handleChange(e)}
              />
            </div>
            <div className="columnCenter">
              <Label htmlFor={CITY_ID}>City ID</Label>
            </div>
          </div>
          <Input small id="callParamsString"
            type="text"
            placeholder={
              props.check === CITY_NAME
                ? 'Toronto, CA'
                : '6167865'
            }
            value={props.callParamsString}
            onChange={(e) => props.handleChange(e)}
          />
        </section>
      </form>
    </div>
  );
};

export default JournalPostWeatherDataInputs;
