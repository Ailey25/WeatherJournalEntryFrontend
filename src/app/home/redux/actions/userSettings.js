import * as types from '../types';
import { API_URL, STATUS_CODE } from '../../constants';
import {
  authenticationHeader,
  getRequestOptions,
  getUserId,
  isClearLocalStorageOnStatusCode,
  formattedSettingsForFrontend,
  formattedSettingsForBackend,
  formattedUserForFrontend,
  formattedUserForBackend,
} from '../../utility';

export const postSettings = (settings) => {
  const formattedSettings = formattedSettingsForBackend(settings);
  const requestOptions = {
    method: 'POST',
    headers: { ...authenticationHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(formattedSettings)
  };

  return async dispatch => {
    dispatch(setIsPosting(true));
    await fetch(API_URL + '/user/settings/', requestOptions)
      .then(response => {
        if (isClearLocalStorageOnStatusCode(response.status)) {
          throw new Error('Unauthorized');
        }
        if (response.ok) {
          dispatch(setOk(true));
        } else {
          dispatch(setOk(false));
        }
        return response.json();
      })
      .then(data => {
        dispatch(setMessage(data.message));
        dispatch(setIsPosting(false));
      })
      .catch((error) => {
        dispatch(setOk(false));
        dispatch(setMessage(error.message));
        dispatch(setIsPosting(false));
      })
  }
}

export const postProfile = (user) => {
  const formattedUser = formattedUserForBackend(user);
  const requestOptions = {
    method: 'POST',
    headers: { ...authenticationHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(formattedUser)
  };

  return async dispatch => {
    dispatch(setIsPosting(true));
    await fetch(API_URL + '/user/profile/' + getUserId(), requestOptions)
      .then(response => {
        if (isClearLocalStorageOnStatusCode(response.status)) {
          throw new Error('Unauthorized');
        }
        if (response.ok) {
          dispatch(setOk(true));
        } else {
          dispatch(setOk(false));
        }
        return response.json();
      })
      .then(data => {
        dispatch(setMessage(data.message));
        dispatch(setIsPosting(false));
      })
      .catch((error) => {
        dispatch(setOk(false));
        dispatch(setMessage(error.message));
        dispatch(setIsPosting(false));
      })
  }
};

export const postPassword = (user, oldPassword) => {
  const formattedUser = formattedUserForBackend(user);
  const requestOptions = {
    method: 'POST',
    headers: { ...authenticationHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(formattedUser)
  };

  return async dispatch => {
    dispatch(setIsPosting(true));
    await fetch(API_URL + '/user/password/' + getUserId() + '/' + oldPassword, requestOptions)
      .then(response => {
        if (isClearLocalStorageOnStatusCode(response.status)) {
          throw new Error('Unauthorized');
        }
        if (response.ok) {
          dispatch(setOk(true));
        } else {
          dispatch(setOk(false));
        }
        return response.json();
      })
      .then(data => {
        dispatch(setMessage(data.message));
        dispatch(setIsPosting(false));
      })
      .catch((error) => {
        dispatch(setOk(false));
        dispatch(setMessage(error.message));
        dispatch(setIsPosting(false));
      })
  }
};

export const postUsername = (user) => {
  const formattedUser = formattedUserForBackend(user);
  const requestOptions = {
    method: 'POST',
    headers: { ...authenticationHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(formattedUser)
  };

  return async dispatch => {
    dispatch(setIsPosting(true));
    await fetch(API_URL + '/user/username/' + getUserId(), requestOptions)
      .then(response => {
        if (isClearLocalStorageOnStatusCode(response.status)) {
          throw new Error('Unauthorized');
        }
        if (response.ok) {
          dispatch(setOk(true));
        } else {
          dispatch(setOk(false));
        }
        return response.json();
      })
      .then(data => {
        dispatch(setMessage(data.message));
        dispatch(setIsPosting(false));
      })
      .catch((error) => {
        dispatch(setOk(false));
        dispatch(setMessage(error.message));
        dispatch(setIsPosting(false));
      })
  }
};

export const deleteAccount = () => {
  const requestOptions = {
    method: 'DELETE',
    headers: { ...authenticationHeader(), 'Content-Type': 'application/json' },
  };

  return async dispatch => {
    dispatch(setIsPosting(true));
    await fetch(API_URL + '/user/' + getUserId(), requestOptions)
      .then(response => {
        if (isClearLocalStorageOnStatusCode(response.status)) {
          throw new Error('Unauthorized');
        }
        if (response.ok) {
          dispatch(setOk(true));
          dispatch(setMessage('Account deleted'));
        } else {
          dispatch(setOk(false));
          dispatch(setMessage('Account can\'t be deleted'));
        }
      })
      .catch((error) => {
        dispatch(setOk(false));
        dispatch(setMessage(error.message));
        dispatch(setIsPosting(false));
      })
  }
};

export const getSettings = () => {
  return async dispatch => {
    dispatch(setIsLoading(true));
    await fetch(API_URL + '/user/settings/' + getUserId(), getRequestOptions())
      .then(response => {
        if (isClearLocalStorageOnStatusCode(response.status)) {
          throw new Error('Unauthorized');
        }
        if (response.ok) {
          dispatch(setOk(true));
        } else {
          dispatch(setOk(false));
        }
        return response.json();
      })
      .then(data => {
        if (data === null) throw new Error('Setting can\'t be retrieved');
        const formattedSettings = formattedSettingsForFrontend(data);
        dispatch(setSettings(formattedSettings));
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        dispatch(setOk(false));
        dispatch(setMessage(error.message));
        dispatch(setIsLoading(false));
      })
  }
};

export const getProfile = () => {
  return async dispatch => {
    dispatch(setIsLoading(true));
    await fetch(API_URL + '/user/' + getUserId(), getRequestOptions())
      .then(response => {
        if (isClearLocalStorageOnStatusCode(response.status)) {
          throw new Error('Unauthorized');
        }
        if (response.ok) {
          dispatch(setOk(true));
        } else {
          dispatch(setOk(false));
          throw new Error('User information can\'t be retrieved')
        }
        return response.json();
      })
      .then(data => {
        const formattedUser = formattedUserForFrontend(data);
        dispatch(setProfile(formattedUser));
        dispatch(setIsLoading(false));
      })
      .catch((error) => {
        dispatch(setOk(false));
        dispatch(setMessage(error.message));
        dispatch(setIsLoading(false));
      })
  }
};

const setIsPosting = (bool) => ({
  type: types.SET_USER_SETTINGS_IS_POSTING,
  isPosting: bool
});

const setIsLoading = (bool) => ({
  type: types.SET_USER_SETTINGS_IS_LOADING ,
  isLoading: bool
});

export const setOk = (ok) => ({
  type: types.SET_USER_SETTINGS_OK,
  ok
});

export const setMessage = (message = '') => ({
  type: types.SET_USER_SETTINGS_MESSAGE,
  message,
});

const setSettings= (settings) => ({
  type: types.SET_SETTINGS,
  tempUnit: settings.tempUnit
});

const setProfile = (user) => ({
  type: types.SET_PROFILE,
  firstname: user.firstname,
  lastname: user.lastname,
});
