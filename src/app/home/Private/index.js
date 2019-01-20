import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import SaveJournalListButton from './SaveJournalListButton/index';
import JournalListContainer from './JournalList/index';
import JournalContainer from './Journal/index';
import UserInfoContainer from './UserInfo/index';
import { getJournalList, postJournalList, setMessage } from '../redux/actions/journalList';
import { getUserId, isUserLoggedIn } from '../utility';

class PrivateContainer extends Component {
  async componentDidMount() {
    this.props.setMessage();
    await this.props.getJournalList();
  }

  handleJournalListPost = async (e) => {
    let userId = getUserId();
    if (userId) {
      await this.props.postJournalList(userId, this.props.journalList);
    } else {
      this.props.setMessage('User id not found');
    }
  }

  displayMessage = () => {
    if (this.props.isPosting) return <label>Saving journals...</label>

    if (this.props.message !== '') {
      if (this.props.ok === true) {
        return <label>Success: {this.props.message}</label>
      } else if (this.props.ok === false) {
        return <label>Failed: {this.props.message}</label>
      }
    }
  }

  render() {
    const component = this;
    return (
      <div>
        <ul>
          <li><Link to="/private/journal-list">See all journal entries</Link></li>
          <li><Link to="/private/journal-entry/create">Create new journal entry</Link></li>
          <li><Link to="/private/user-settings/settings">Settings</Link></li>
        </ul>
        <SaveJournalListButton
          handleJournalListPost={(e) => component.handleJournalListPost(e)}
        />
        {this.displayMessage()}
        <Route path="/private/journal-list" render={() => (
          <JournalListContainer journalList={component.props.journalList} />
        )} />
        <Route path="/private/journal-entry/:mode/:id?" render={(props) => (
          <JournalContainer key={props.match.params.mode} {...props} />
        )} />
        <Route path ="/private/user-settings" render={() => (
          <UserInfoContainer />
        )} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  journalList: state.journalListReducer.journalList,
  isPosting: state.journalListReducer.isPosting,
  ok: state.journalListReducer.ok,
  message: state.journalListReducer.message,
});

const mapDispatchToProps = (dispatch) => ({
  getJournalList: () =>
    dispatch(getJournalList()),
  postJournalList: (id, journalList) =>
    dispatch(postJournalList(id, journalList)),
  setMessage: () =>
    dispatch(setMessage()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PrivateContainer)
);
