import {
  CELCIUS, FAHRENHEIT,
  CITY_NAME_VALIDATION_STATUS, CITY_ID_VALIDATION_STATUS,
  STATUS_CODE,
} from './constants'

import {
  validateCityName,
  validateCityId,
  calcTemp,
} from './utility';

describe('validateCityName()', () => {
  let cityName = '';
  let result = '';

  describe('cityName is empty', () => {
    it('returns failed status: empty', () => {
      result = validateCityName(cityName);
      expect(result).toBe(CITY_NAME_VALIDATION_STATUS.EMPTY);
    });
  });

  describe('cityName contains numbers', () => {
    beforeEach(() => {
      cityName = 'toronto1';
      result = validateCityName(cityName);
    });

    it('returns failed status: non alphabet', () => {
      expect(result).toBe(CITY_NAME_VALIDATION_STATUS.NON_ALPHABET);
    });
  });

  describe('cityName contains invalid comma', () => {
    it('returns failed status: invalid comma', () => {
      cityName = 'toronto1,';
      result = validateCityName(cityName);
      expect(result).toBe(CITY_NAME_VALIDATION_STATUS.INVALID_COMMA);
    });

    it('returns failed status: invalid comma', () => {
      cityName = ',toronto1';
      result = validateCityName(cityName);
      expect(result).toBe(CITY_NAME_VALIDATION_STATUS.INVALID_COMMA);
    });
  });

  describe('cityName is valid', () => {
    beforeEach(() => {
      cityName = 'toronto, ca';
      result = validateCityName(cityName);
    });

    it('returns success status', () => {
      expect(result).toBe(CITY_NAME_VALIDATION_STATUS.SUCCESS);
    });
  });
});

describe('validateCityId()', () => {
  let cityId = '';
  let result = '';

  describe('cityId is empty', () => {
    it('returns failed status: empty', () => {
      result = validateCityId(cityId);
      expect(result).toBe(CITY_ID_VALIDATION_STATUS.EMPTY);
    });
  });

  describe('cityId contains alphabet', () => {
    beforeEach(() => {
      cityId = 'toronto1';
      result = validateCityId(cityId);
    });

    it('returns failed status: non numbers', () => {
      expect(result).toBe(CITY_ID_VALIDATION_STATUS.NON_NUMBER);
    });
  });

  describe('cityId contains invalid comma', () => {
    it('returns failed status: invalid comma', () => {
      cityId = '12,';
      result = validateCityId(cityId);
      expect(result).toBe(CITY_ID_VALIDATION_STATUS.NON_NUMBER);
    });
  });

  describe('cityId is valid', () => {
    beforeEach(() => {
      cityId = '6167865';
      result = validateCityId(cityId);
    });

    it('returns success status', () => {
      expect(result).toBe(CITY_ID_VALIDATION_STATUS.SUCCESS);
    });
  });
});

describe('calcTemp()', () => {
  let temp = '';
  let unit = '';
  let result = '';

  describe('from kelvin to CELCIUS', () => {
    beforeEach(() => {
      unit = CELCIUS;
    });

    it('returns success status', () => {
      temp = 273.15;
      result = calcTemp(temp, unit);

      expect(result).toBe(0);
    });
  });
});
