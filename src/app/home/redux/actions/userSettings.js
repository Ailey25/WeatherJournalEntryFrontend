import * as types from '../types';
import { BASE_URL } from '../../constants';
import {
  authenticationHeader,
  getUserId,
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
    await fetch(BASE_URL + '/user/settings/', requestOptions)
      .then(response => {
        if (response.ok) {
          dispatch(setOk(true));
        } else {
          dispatch(setOk(false));
        }
        return response.json()
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
    await fetch(BASE_URL + '/user/profile/' + getUserId(), requestOptions)
      .then(response => {
        if (response.ok) {
          dispatch(setOk(true));
        } else {
          dispatch(setOk(false));
        }
        return response.json()
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
    await fetch(BASE_URL + '/user/password/' + getUserId() + '/' + oldPassword, requestOptions)
      .then(response => {
        if (response.ok) {
          dispatch(setOk(true));
        } else {
          dispatch(setOk(false));
        }
        return response.json()
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
    await fetch(BASE_URL + '/user/username/' + getUserId(), requestOptions)
      .then(response => {
        if (response.ok) {
          dispatch(setOk(true));
        } else {
          dispatch(setOk(false));
        }
        return response.json()
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
    await fetch(BASE_URL + '/user/' + getUserId(), requestOptions)
      .then(response => {
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

const getRequestOptions = {
  method: 'GET',
  headers: { ...authenticationHeader(), 'Content-Type': 'application/json' }
};

export const getSettings = () => {
  return async dispatch => {
    dispatch(setIsLoading(true));
    await fetch(BASE_URL + '/user/settings/' + getUserId(), getRequestOptions)
      .then(response => {
        if (response.ok) {
          dispatch(setOk(true));
        } else {
          dispatch(setOk(false));
        }
        return response.json()
      })
      .then(data => {
        if (data == null) throw new Error('Setting can\'t be retrieved');
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
}

export const getProfile = () => {
  return async dispatch => {
    dispatch(setIsLoading(true));
    await fetch(BASE_URL + '/user/' + getUserId(), getRequestOptions)
      .then(response => {
        if (response.ok) {
          dispatch(setOk(true));
        } else {
          dispatch(setOk(false));
          throw new Error('User information can\'t be retrieved')
        }
        return response.json()
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
}

const setIsPosting = (bool) => ({
  type: types.USER_SETTINGS_IS_POSTING,
  isPosting: bool
});

const setIsLoading = (bool) => ({
  type: types.USER_SETTINGS_IS_LOADING ,
  isLoading: bool
});

export const setOk = (ok) => ({
  type: types.USER_SETTINGS_OK,
  ok
});

export const setMessage = (message = '') => ({
  type: types.USER_SETTINGS_MESSAGE,
  message,
});

const setSettings= (settings) => ({
  type: types.SETTINGS_GET_SUCCESS,
  tempUnit: settings.tempUnit
});

const setProfile = (user) => ({
  type: types.PROFILE_GET_SUCCESS,
  firstname: user.firstname,
  lastname: user.lastname,
});
