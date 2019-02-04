import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import JournalListContainer from './JournalList/index';
import JournalContainer from './Journal/index';
import UserInfoContainer from './UserInfo/index';
import { getJournalList } from '../redux/actions/journalList';

import { APP_URL } from '../Routes/constants';

class PrivateContainer extends Component {
  async componentDidMount() {
    await this.props.getJournalList();
  }

  render() {
    const component = this;
    return (
      <div>
        <Route exact path={APP_URL.JOURNALS_TAB} render={() => (
          <JournalListContainer />
        )} />
        <Route path={APP_URL.JOURNALS_TAB + '/:mode/:id?'} render={(props) => (
          <JournalContainer key={props.match.params.mode} {...props} />
        )} />
        <Route path={APP_URL.SETTINGS_TAB} render={() => (
          <UserInfoContainer />
        )} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getJournalList: () =>
    dispatch(getJournalList()),
});

export default withRouter(
  connect(null, mapDispatchToProps)(PrivateContainer)
);
