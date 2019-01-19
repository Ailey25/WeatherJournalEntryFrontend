import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import JournalList from './JournalList/index';
import SaveJournalListButton from './SaveJournalListButton/index';
import JournalContainer from '../Journal/index';
import UserInfoContainer from '../UserInfo/index';
import {
  getJournalList,
  postJournalList,
  setMessage,
} from '../redux/actions/journalList';
import { deleteJournal } from '../redux/actions/synchronous';
import { getUserId } from '../utility';

class JournalListContainer extends Component {
  async componentDidMount() {
    this.props.resetMessage();
    await this.props.getJournalList();
  }

  handleJournalListPost = async (e) => {
    let userId = getUserId();
    if (userId) {
      await this.props.postJournalList(userId, this.props.journalList);
    } else {
      console.log('userId not found: ');
    }
  }

  handleJournalDelete = (e, journalId) => {
    //this.props.deleteJournal(this.props.journalList, journalId);
  }

  displayMessage = () => {
    if (this.props.isPosting) return <label>Saving journals...</label>

    if (this.props.ok === undefined) {
      return null;
    } else if (this.props.ok === true) {
      return <label>Success: {this.props.message}</label>
    } else if (this.props.ok === false) {
      return <label>Failed: {this.props.message}</label>
    }
  }

  render() {
    const component = this;
    return (
      <div>
        <ul>
          <li><Link to="/private">See all journal entries</Link></li>
          <li><Link to="/private/journal-entry/create">Create new journal entry</Link></li>
          <li><Link to="/private/user-settings">Settings</Link></li>
        </ul>
        <SaveJournalListButton
          handleJournalListPost={(e) => component.handleJournalListPost(e)}
        />
        {this.displayMessage()}
        <Route exact path="/private" render={() => (
          <JournalList
            isLoading={component.props.isLoading}
            journalList={component.props.journalList}
            handleJournalDelete={component.props.handleJournalDelete}
          />
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
  isLoading: state.journalListReducer.isLoading,
  ok: state.journalListReducer.ok,
  message: state.journalListReducer.message,
});

const mapDispatchToProps = (dispatch) => ({
  getJournalList: () =>
    dispatch(getJournalList()),
  postJournalList: (id, journalList) =>
    dispatch(postJournalList(id, journalList)),
  resetMessage: () =>
    dispatch(setMessage()),
  deleteJournal: (journalList) =>
    dispatch(deleteJournal(journalList, id)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JournalListContainer)
);
