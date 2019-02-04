import React from 'react';
import * as types from '../types';
import { API_URL, STATUS_CODE } from '../../constants';
import { authenticationHeader } from '../../utility';

export const login = (username, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authenticationHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return async dispatch => {
    dispatch(setIsAuthenticating(true));
    await fetch(API_URL + '/user/authenticate', requestOptions)
      .then(response => {
        if (response.status === STATUS_CODE.GATEWAY_TIMEOUT) {
          throw new Error('Server is currently offline');
        }
        if (!(response.ok)) throw new Error('Username or password is incorrect');
        return response.json()
      })
      .then(data => {
        localStorage.setItem('token', JSON.stringify(data.Token));
        localStorage.setItem('userId', JSON.stringify(data.Id));
        dispatch(setOk(true));
        dispatch(setMessage(data.message));
        dispatch(setIsAuthenticating(false));
      })
      .catch((error) => {
        dispatch(setOk(false));
        dispatch(setMessage(error.message));
        dispatch(setIsAuthenticating(false));
      })
  }
};

export const register = (user) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authenticationHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return async dispatch => {
    dispatch(setIsAuthenticating(true));
    await fetch(API_URL + '/user/register', requestOptions)
      .then(response => {
        if (response.status === STATUS_CODE.GATEWAY_TIMEOUT) {
          throw new Error('Server is currently offline');
        }
        if (response.ok) {
          dispatch(setOk(true));
        } else {
          dispatch(setOk(false));
        }
        return response.json()
      })
      .then(data => {
        dispatch(setMessage(data.message));
        dispatch(setIsAuthenticating(false));
      })
      .catch((error) => {
        dispatch(setOk(false));
        dispatch(setMessage(error.message));
        dispatch(setIsAuthenticating(false));
      })
  }
};

const setIsAuthenticating = (bool) => ({
  type: types.SET_USER_IS_AUTHENTICATING,
  isAuthenticating: bool,
});

const setOk = (ok) => ({
  type: types.SET_USER_STATE_OK,
  ok
});

export const setMessage = (message = '') => ({
  type: types.SET_USER_STATE_MESSAGE,
  message,
});
