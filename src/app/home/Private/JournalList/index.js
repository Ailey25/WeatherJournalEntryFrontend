import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SaveJournalListButton from './SaveJournalListButton/index';
import JournalList from './JournalList/index';
import { deleteJournal } from '../../redux/actions/synchronous';
import { postJournalList, setMessage } from '../../redux/actions/journalList';
import { getUserId, isUserLoggedIn } from '../../utility';
import { APP_URL } from '../../Routes/constants';

import { JournalListStyle, StyledLink } from './styles';

class JournalListContainer extends Component {
  componentDidMount() {
    this.props.setMessage();
  }

  handleJournalClick = (e) => {
    this.props.history.push(APP_URL.JOURNALS_TAB + '/view/' + e.currentTarget.id);
  }

  handleJournalDelete = (e) => {
    this.props.deleteJournal(this.props.journalList, e.currentTarget.id);
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
      <JournalListStyle>
        <StyledLink to={APP_URL.JOURNALS_TAB + '/create'}>
          Create new journal
        </StyledLink>
        <div className="row">
          <h2>Journal Entries</h2>
          <div className="columnCenter">
            <SaveJournalListButton
              handleJournalListPost={(e) => component.handleJournalListPost(e)}
            />
          </div>
          <div className="columnCenter">{this.displayMessage()}</div>
        </div>
        <hr></hr>
        <JournalList
          isLoading={component.props.isLoading}
          journalList={component.props.journalList}
          handleJournalClick = {(e) => component.handleJournalClick(e)}
          handleJournalDelete={(e) => component.handleJournalDelete(e)}
        />
      </JournalListStyle>
    );
  }
}

const mapStateToProps = (state) => ({
  isPosting: state.journalListReducer.isPosting,
  isLoading: state.journalListReducer.isLoading,
  journalList: state.journalListReducer.journalList,
  ok: state.journalListReducer.ok,
  message: state.journalListReducer.message,
});

const mapDispatchToProps = (dispatch) => ({
  deleteJournal: (journalList, id) =>
    dispatch(deleteJournal(journalList, id)),
  postJournalList: (id, journalList) =>
    dispatch(postJournalList(id, journalList)),
  setMessage: () =>
    dispatch(setMessage()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JournalListContainer)
);
