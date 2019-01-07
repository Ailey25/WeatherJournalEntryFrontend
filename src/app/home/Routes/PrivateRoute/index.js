import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { store } from '../../../../index';
import JournalListContainer from '../../JournalList/index';
import { isUserLoggedIn } from '../../utility';

const PrivateRoute = ({component: Component, ...rest}) => {
  const { isLoggedIn } = store.getState().userInfoReducer;
  return (
    <Route {...rest} render={(props) => (
      isUserLoggedIn()
      ? (<Component {...props} />)
      : (<Redirect to={{
          pathname: "/login",
          state: { from: props.location }
        }} />)
    )} />
  );
};

export default PrivateRoute;
