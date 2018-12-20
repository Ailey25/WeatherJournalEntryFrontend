import React from "react";
import {
  BASE_URL,
  EDIT, CREATE,
  CITY_NAME, CITY_ID,
  CELCIUS, FAHRENHEIT
} from './constants';

// Returns 1 if valid
// Returns 2 if empty
// Returns 3 if non alphabets
// Returns 4 if invalid comma
export const validateCityName = (cityName) => {
  if (cityName === '') return 2;
  let alphabetsCheck = /^[a-z][a-z/\s,]*$/i.test(cityName);
  let commaCheck = /^[^,]+,[^,]+$/.test(cityName);
  if (cityName.indexOf(',') !== -1) {
    if (!commaCheck) return 3;
  }
  if (!(alphabetsCheck)) return 4;
  return 1;
}

// Returns 1 if valid
// Returns 2 if empty
// Returns 4 if non numbers
export const validateCityId = (cityId) => {
  if (cityId === '') return 2;
  let numbersCheck = /^[0-9]+$/.test(cityId);
  if (!numbersCheck) return 4;
  return 1;
}

export const setDataWeatherPostUrl = (
  mode, callType, weatherObjectId, callParamsString='', cityId=''
) => {
  try {
    if (weatherObjectId === '') throw 'weatherObjectId is empty';
    let fetchUrl = BASE_URL;
    switch (mode) {
      case EDIT:
        if (cityId === '') throw 'cityid is empty';
        fetchUrl += '/cityid/' + weatherObjectId + '/' + cityId;
        return fetchUrl;
      case CREATE:
        if (callParamsString === '') throw 'callParamsString is empty';
        let params = callParamsString.split(',').map(param => {
          return param.trim().replace(/\s\s+/g, ' ');
        });
        switch (callType) {
          case CITY_NAME:
            let byCityNameParam = '/' + params[0];
            if (params.length > 1) {
              byCityNameParam += '/' + params[1];
            }
            fetchUrl += '/cityname/' + weatherObjectId + byCityNameParam;
            return fetchUrl;
          case CITY_ID:
            let byCityIdParam = '/' + params[0];
            fetchUrl += '/cityid/' + weatherObjectId + byCityIdParam;
            return fetchUrl;
          default:
            throw 'callType not recognized';
          }
      default:
        throw 'journal mode not recognized';
      }
    } catch (err) {
      console.log('Error in setDataWeatherPostUrl: ' + err);
    }
}

export const calcTemp = (tempInKelvin, toUnit) => {
  if (toUnit === CELCIUS) {
    let tempCelcius = tempInKelvin - 273.15;
    tempCelcius = Math.round(tempCelcius * 100) / 100;
    return tempCelcius;
  } else if (toUnit === FAHRENHEIT) {
    let tempFahrenheit = (tempInKelvin - 273.15) * 9/5 + 32;
    tempFahrenheit = Math.round(tempFahrenheit * 100) / 100;
    return tempFahrenheit;
  }
}
