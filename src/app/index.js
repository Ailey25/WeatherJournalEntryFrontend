import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import PrivateContainer from './home/Private/index';
import UserStateFormContainer from './home/UserStateForm/index'
import PublicContainer from './home/Public/index';
import PrivateRoute from './home/Routes/PrivateRoute/index';
import { APP_URL } from './home/Routes/constants';

import styled, { ThemeProvider } from 'styled-components';
import { StyledApp } from './styles';
import { GlobalStyle } from '../globalStyles';
import { theme } from '../constantsStyles';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledApp>
          <Route path="/" component={PublicContainer} />
          <Route path={APP_URL.LOGIN} render={(props) =>
            <UserStateFormContainer key={props.match.params} {...props} />
          } />
          <Route path={APP_URL.REGISTER} render={(props) =>
            <UserStateFormContainer key={props.match.params} {...props} />
          } />
          <PrivateRoute path="/journals/" component={PrivateContainer} />
          <PrivateRoute path={APP_URL.SETTINGS_TAB} component={PrivateContainer} />
          <GlobalStyle />
        </StyledApp>
      </ThemeProvider>
    );
  }
}

export default hot(module)(App);
