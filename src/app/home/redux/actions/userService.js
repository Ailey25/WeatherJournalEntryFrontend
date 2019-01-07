import React from 'react';
import * as types from '../types';
import { BASE_URL } from '../../constants';
import { authenticationHeader } from '../../utility';

export const login = (username, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authenticationHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return async dispatch => {
    dispatch(setIsAuthenticating(true));
    await fetch(BASE_URL + '/user/authenticate', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          localStorage.setItem('token', JSON.stringify(data.user.Token));
          dispatch(setUserStatus({ status: true, message: 'Success: user is logged in' }));
        } else {
          dispatch(setUserStatus({ status: false, message: data.message }));
        }
        dispatch(setIsAuthenticating(false));
      })
      .catch(error => {
        dispatch(setUserStatus({ status: false, message: error }));
        dispatch(setIsAuthenticating(false));
      });
  }
};

export const registerUser = (user) => {
  const requestOptions = {
    method: 'POST',
    headers: { ...authenticationHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return async dispatch => {
    dispatch(setIsAuthenticating(true));
    await fetch(BASE_URL + '/user/register', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          localStorage.setItem('token', JSON.stringify(data.user.Token));
          dispatch(setUserStatus({ status: true, message: 'Success: user is registered' }));
        } else {
          dispatch(setUserStatus({ status: false, message: data.message }));
        }
        dispatch(setIsAuthenticating(false));
      })
      .catch(error => {
        dispatch(setUserStatus({ status: false, message: error }));
        dispatch(setIsAuthenticating(false));
      });
  }
};

// export const updateUser = (user) => {
//   const requestOptions = {
//     method: 'POST',
//     headers: { ...authenticationHeader(), 'Content-Type': 'application/json' },
//     body: JSON.stringify(user)
//   };
//
//   return async dispatch => {
//     dispatch(setIsAuthenticating(true));
//     await fetch(BASE_URL + '/user/' + user.id, requestOptions)
//       .then(response => response.json())
//       .then(data => {
//         dispatch(setUserStatus({ success: true, message: 'Success: user updated' }));
//         dispatch(setIsAuthenticating(false));
//       })
//       .catch(error => {
//         dispatch(setUserStatus({ success: false, message: error }));
//         dispatch(setIsAuthenticating(false));
//       });
//     }
// };

// export const getById = (id) => {
//   const requestOptions = {
//     method: 'GET',
//     headers: authenticationHeader()
//   };
//
//   return async dispatch => {
//     dispatch(setIsAuthenticating(true));
//     await fetch(BASE_URL + '/user/' + id, requestOptions)
//       .then(response => response.json())
//       .then(data => {
//         // do something to get data
//         dispatch(setIsAuthenticating(false));
//       })
//       .catch(error => {
//         dispatch(setAuthenticateError(error))
//         dispatch(setIsAuthenticating(false));
//       });
//     }
// };

export const logout = () => {
  localStorage.removeItem('token');
};

// export const deleteUser = (id) => {
//   const requestOptions = {
//     method: 'DELETE',
//     headers: authenticationHeader()
//   };
//
//   return async dispatch => {
//     dispatch(setIsAuthenticating(true));
//     await fetch(BASE_URL + '/user/' + id, requestOptions)
//       .then(response => response.json())
//       .then(data => {
//         // do something to get data
//         dispatch(setIsAuthenticating(false));
//       })
//       .catch(error => {
//         dispatch(setAuthenticateError(error))
//         dispatch(setIsAuthenticating(false));
//       });
//   }
// };
/*
if (!response.ok) {
if (response.status === 401) {
  // auto logout if 401 response returned from api
  logout();
  location.reload(true);
}
*/

const setIsAuthenticating = (bool) => ({
  type: types.USER_IS_AUTHENTICATING,
  isAuthenticating: bool,
});

export const setUserStatus = (userStatusObject) => ({
  type: types.USER_STATUS,
  userStatus: {
    status: userStatusObject.status,
    message: userStatusObject.message,
  },
});
