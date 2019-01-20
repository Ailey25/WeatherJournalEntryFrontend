import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import JournalList from './JournalList/index';
import { deleteJournal } from '../../redux/actions/synchronous';

class JournalListContainer extends Component {
  handleJournalDelete = (e) => {
    this.props.deleteJournal(this.props.journalList, e.currentTarget.id);
  }

  render() {
    const component = this;
    return (
      <JournalList
        isLoading={component.props.isLoading}
        journalList={component.props.journalList}
        handleJournalDelete={(e) => component.handleJournalDelete(e)}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.journalListReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  deleteJournal: (journalList, id) =>
    dispatch(deleteJournal(journalList, id)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JournalListContainer)
);
