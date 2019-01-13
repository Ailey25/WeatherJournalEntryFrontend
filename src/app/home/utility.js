import React from 'react';
import {
  BASE_URL,
  EDIT, CREATE,
  CITY_NAME, CITY_ID,
  CELCIUS, FAHRENHEIT,
  CITY_NAME_VALIDATION_STATUS, CITY_ID_VALIDATION_STATUS,
} from './constants'

export const validateCityName = (cityName) => {
  if (cityName === '') return CITY_NAME_VALIDATION_STATUS.EMPTY;
  let alphabetsCheck = /^[a-z][a-z/\s,]*$/i.test(cityName);
  let commaCheck = /^[^,]+,[^,]+$/.test(cityName);
  if (cityName.indexOf(',') !== -1) {
    if (!commaCheck) {
      return CITY_NAME_VALIDATION_STATUS.INVALID_COMMA;
    }
  }
  if (!(alphabetsCheck)) return CITY_NAME_VALIDATION_STATUS.NON_ALPHABET;
  return CITY_NAME_VALIDATION_STATUS.SUCCESS;
};

export const validateCityId = (cityId) => {
  if (cityId === '') return CITY_ID_VALIDATION_STATUS.EMPTY;
  let numbersCheck = /^[0-9]+$/.test(cityId);
  if (!numbersCheck) return CITY_ID_VALIDATION_STATUS.NON_NUMBER;
  return CITY_ID_VALIDATION_STATUS.SUCCESS;
};

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
};

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
};

export const authenticationHeader = () => {
  let token = JSON.parse(localStorage.getItem('token'));

  if (token) {
      return { 'Authorization': 'Bearer ' + token };
  } else {
      return {};
  }
};

export const isUserLoggedIn = () => {
  if (localStorage.getItem('token')) return true;
  return false;
};

export const getUserId = () => {
  return JSON.parse(localStorage.getItem('userId'));
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};

export const formatJournalsForFrontend = (journals) => {
  return journals.map(journal => ({
    id: journal.JournalId,
    title: journal.Title,
    entry: journal.Entry,
    cityId: journal.CityId,
  }));
};

export const formatJournalsForBackend = (journalList) => {
  return journalList.map(journal => ({
    JournalId: journal.id,
    Title: journal.title,
    Entry: journal.entry,
    CityId: journal.cityId,
  }));
};
