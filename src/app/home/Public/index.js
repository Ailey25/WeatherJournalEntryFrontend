import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import AppDescription from './AppDescription/index';

class PublicContainer extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/private/journal-list">Private</Link></li>
        </ul>
        <AppDescription />
      </div>
    );
  }
}

export default PublicContainer;
