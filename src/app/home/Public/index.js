import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import UserStateButtonContainer from '../UserStateButton/index';
import Home from './Home/index';
import { APP_URL } from '../Routes/constants';

import { MainNavMenu, NavBarLink as Link } from './styles';

class PublicContainer extends Component {
  render() {
    return (
      <div>
        <MainNavMenu>
          <div className="row spaceBetween">
            <div className="row">
              <div className="columnCenter">
                <Link to={APP_URL.HOME_TAB}>Home</Link>
              </div>
              <div className="columnCenter">
                <Link to={APP_URL.JOURNALS_TAB}>Journals</Link>
              </div>
              <div className="columnCenter">
                <Link to={APP_URL.SETTINGS_TAB}>Settings</Link>
              </div>
            </div>
            <div className="column">
              <UserStateButtonContainer />
            </div>
          </div>
        </MainNavMenu>
        <Route exact path='/' render={() => (
          <Home />
        )} />
        <Route path={APP_URL.HOME_TAB} render={() => (
          <Home />
        )} />
      </div>
    );
  }
}

export default PublicContainer;
