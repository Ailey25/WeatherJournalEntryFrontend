export const API_URL = process.env.API_URL + '/api/values';

// weather stamp
export const CELCIUS = 'C';
export const FAHRENHEIT = 'F';

// weather
export const WEATHER_OBJECT = 'WEATHER_OBJECT';
export const MAIN = 'MAIN';
export const WEATHER = 'WEATHER';

// Login and register and settings
// also used as input ids for login/register so " " instead of ' '
export const USERNAME = "username";
export const FIRSTNAME = "firstname";
export const LASTNAME = "lastname";
export const PASSWORD = "password";
export const CONFIRM_PASSWORD = 'confirm-password';
export const NEW_PASSWORD = 'new-password';
export const OLD_PASSWORD = 'old-password';
export const NEW_USERNAME = "new-username";
export const DELETE_ACCOUNT = "delete-account";

// journal
// also used as input ids for journal so " " instead of ' '
export const CREATE = "create";
export const EDIT = "edit";
export const CITY_ID = 'CITY_ID';
export const CITY_NAME = 'CITY_NAME';

// status code for backend responses
const UNAUTHORIZED = 'UNAUTHORIZED';
const GATEWAY_TIMEOUT = 'GATEWAY_TIMEOUT';

export const STATUS_CODE = {
  [UNAUTHORIZED]: 401,
  [GATEWAY_TIMEOUT]: 504,
};

// submission validation
const SUCCESS = 'SUCCESS';
const EMPTY = 'EMPTY';
const NON_ALPHABET = 'NON_ALPHABET';
const INVALID_COMMA = 'INVALID_COMMA';
const NON_NUMBER = 'NON_NUMBER';

export const CITY_NAME_VALIDATION_STATUS = {
  [SUCCESS]: 1,
  [EMPTY]: 2,
  [INVALID_COMMA]: 3,
  [NON_ALPHABET]: 4,
};

export const CITY_ID_VALIDATION_STATUS = {
  [SUCCESS]: 1,
  [EMPTY]: 2,
  [NON_NUMBER]: 3,
};

export const CITY_NAME_VALIDATION_MESSAGE = {
  [CITY_NAME_VALIDATION_STATUS.EMPTY]: 'City name value cannot be empty',
  [CITY_NAME_VALIDATION_STATUS.INVALID_COMMA]: 'Enter country code after comma or remove comma',
  [CITY_NAME_VALIDATION_STATUS.NON_ALPHABET]: 'City name and/or country code can only contain alphabets',
};

export const CITY_ID_VALIDATION_MESSAGE = {
  [CITY_ID_VALIDATION_STATUS.EMPTY]: 'City id value cannot be empty',
  [CITY_ID_VALIDATION_STATUS.NON_NUMBER]: 'City ID must be numbers',
};
