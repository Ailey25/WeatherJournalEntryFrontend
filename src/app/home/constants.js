export const BASE_URL = '/api/values';
export const STATUS_CODE_UNAUTHORIZED = '401';

// Login and register
// also used as input ids for login/register so " " instead of ' '
export const USERNAME = "username";
export const FIRSTNAME = "firstname";
export const LASTNAME = "lastname";
export const PASSWORD = "password";

// home
export const TOGGLE_TEMP_UNIT = 'TOGGLE_TEMP_UNIT';

// journal
// also used as input ids for journal so " " instead of ' '
export const CREATE = "create";
export const EDIT = "edit";
export const CITY_ID = 'CITY_ID';
export const CITY_NAME = 'CITY_NAME';

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

// weather stamp
export const CELCIUS = 'C';
export const FAHRENHEIT = 'F';
