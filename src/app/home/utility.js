import React from 'react';
import {
  API_URL,
  EDIT, CREATE,
  CITY_NAME, CITY_ID,
  CELCIUS, FAHRENHEIT,
  CITY_NAME_VALIDATION_STATUS, CITY_ID_VALIDATION_STATUS,
  STATUS_CODE,
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
    let fetchUrl = API_URL;
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
  let token = localStorage.getItem('token');

  if (token) {
      return { 'Authorization': 'Bearer ' + JSON.parse(token) };
  } else {
      return {};
  }
};

export const getRequestOptions = () => ({
  method: 'GET',
  headers: { ...authenticationHeader(), 'Content-Type': 'application/json' }
});

export const isUserLoggedIn = () => {
  if (localStorage.getItem('token')) return true;
  return false;
};

export const getUserId = () => {
  return JSON.parse(localStorage.getItem('userId'));
};

export const clearLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};

// clear local storage on certain status codes
export const isClearLocalStorageOnStatusCode = (statusCode) => {
  if (statusCode === STATUS_CODE.UNAUTHORIZED ||
      statusCode === STATUS_CODE.GATEWAY_TIMEOUT) {
        clearLocalStorage();
        return true;
  }
  return false;
}

export const formattedWeatherObjectForFrontend = (weatherObject) => ({
  cityId: weatherObject.Id,
  cityName: weatherObject.Name,
});

export const formattedMainForFrontend = (main) => ({
  temp: main.Temp,
});

export const formattedWeathersForFrontend = (weathers) => {
  return weathers.map(weather => ({
    id: weather.Id,
    main: weather.Main,
    icon: weather.Icon,
    weatherId: weather.WeatherId,
    description: weather.Description
  }));
};

export const formattedJournalsForFrontend = (journals) => {
  return journals.map(journal => ({
    id: journal.JournalId,
    title: journal.Title,
    entry: journal.Entry,
    cityId: journal.CityId
  }));
};

export const formattedJournalsForBackend = (journalList) => {
  return journalList.map(journal => ({
    JournalId: journal.id,
    Title: journal.title,
    Entry: journal.entry,
    CityId: journal.cityId
  }));
};

export const formattedSettingsForFrontend = (settings) => ({
  tempUnit: settings.TempUnit
});

export const formattedSettingsForBackend = (settings) => ({
  UserId: getUserId(),
  TempUnit: settings.tempUnit
});

export const formattedUserForBackend = (user) => ({
  Username: user.username || '',
  FirstName: user.firstname || '',
  LastName: user.lastname || '',
  Password: user.password || ''
});

export const formattedUserForFrontend = (user) => ({
  username: user.Username || '',
  firstname: user.FirstName || '',
  lastname: user.LastName || ''
});
