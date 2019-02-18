import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import JournalListContainer from './JournalList';
import CreateModeContainer from './Journal/CreateMode';
import EditModeContainer from './Journal/EditMode';
import ViewModeContainer from './Journal/ViewMode';
import UserInfoContainer from './UserInfo';
import { getJournalList } from '../redux/actions/journalList';

import { APP_URL } from '../Routes/constants';
import { CREATE, EDIT, VIEW } from '../constants';

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
        <Route path={APP_URL.JOURNALS_TAB + '/' + CREATE} render={(props) => (
          <CreateModeContainer {...props} />
        )} />
        <Route path={APP_URL.JOURNALS_TAB + '/' + EDIT + '/:id?'} render={(props) => (
          <EditModeContainer {...props} />
        )} />
        <Route path={APP_URL.JOURNALS_TAB + '/' + VIEW + '/:id?'} render={(props) => (
          <ViewModeContainer {...props} />
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
