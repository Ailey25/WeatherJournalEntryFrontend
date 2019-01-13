import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import JournalList from './JournalList/index';
import SaveJournalListButton from './SaveJournalListButton/index';
import { addToJournalList, editJournalList } from '../redux/actions/actions';
import JournalContainer from '../Journal/index';
import SettingsContainer from '../Settings/index';
import { postJournalList, setMessageObject } from '../redux/actions/postJournalList';
import { getJournalList } from '../redux/actions/getJournalList';
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

  addJournal = (journalObject) => {
    this.props.onAddToJournalList(journalObject);
  }

  editJournal = (journalObject) => {
    let index = this.props.journalList.findIndex(j => j.id === journalObject.id);
    if (index !== -1) {
      this.props.onEditJournalList(journalObject, index);
    } // object's id doesn't exist in journalList
  }

  getJournal = (journalId) => {
    let object;
    this.props.journalList.forEach((elem) => {
      if (elem.id === journalId) {
        object = elem;
      }
    });
    return object;
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
          <li><Link to="/private/settings">Settings</Link></li>
        </ul>
        <SaveJournalListButton
          handleJournalListPost={(e) => component.handleJournalListPost(e)}
        />
        {this.displayMessage()}
        <Route exact path="/private" render={() => (
          <JournalList
            isLoading={component.props.isLoading}
            journalList={component.props.journalList}
          />
        )} />
        <Route path="/private/journal-entry/:mode/:id?" render={(props) => (
          <JournalContainer key={props.match.params.mode} {...props}
            addJournalEntry = {component.addJournal}
            editJournalEntry = {component.editJournal}
            getJournalEntry = {component.getJournal} />
        )} />
        <Route path ="/private/settings" render={() => (
          <SettingsContainer />
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
    dispatch(setMessageObject({ message: '' })),
  onAddToJournalList: (journalObject) =>
    dispatch(addToJournalList(journalObject)),
  onEditJournalList: (journalObject, index) =>
    dispatch(editJournalList(journalObject, index)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JournalListContainer)
);
