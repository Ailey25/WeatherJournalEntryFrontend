import * as types from '../types';
import { BASE_URL } from '../../constants';

export const postUserInfo = (postBody) => {
  const requestOptions = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      authenticationHeader()
    }),
    body: JSON.stringify(postBody)
  };
  return async dispatch => {
    dispatch(userInfoIsPosting(true));
    await fetch(BASE_URL + '/user/user-info', requestOptions)
      .then(response => {
        if (response.ok) {
          dispatch(userInfoPostSuccess(response));
        }
        dispatch(userInfoIsPosting(false));
      })
      .catch((error) => {
        dispatch(setErrorObject(error));
        dispatch(userInfoIsPosting(false));
      })
  }
};

const userInfoIsPosting = (bool) => ({
  type: types.USER_INFO_IS_POSTING,
  isPosting: bool
});

const userInfoPostSuccess = (response) => ({
  type: types.USER_INFO_POST_SUCCESS,
  response
});

const setErrorObject = (error) => ({
  type: types.USER_INFO_ERROR,
  error: {
    status: error.status,
    message: error.message,
  }
});
