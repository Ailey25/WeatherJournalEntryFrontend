import React from 'react';
import { Link } from 'react-router-dom';

import { APP_URL } from '../../Routes/constants';

import { HomeStyle, Label, StyledLink } from '../styles';

const Home = (props) => {
  return (
  <HomeStyle>
    <div className="rowCenter">
      <Label>Create and manage your weather journals.</Label>
    </div>
    <div className="rowCenter">
      <StyledLink to={APP_URL.JOURNALS_TAB}>Get started</StyledLink>
    </div>
  </HomeStyle>
)};

export default Home;
