import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import 'babel-polyfill';

import { ViewModeContainer } from './ViewMode';
import { EditModeContainer } from './EditMode';

configure({ adapter: new Adapter() })

// getJournal() takes this.match.params.id,
// searches through this.props.journalList
// and sets this.state.title and this.state.entry accordingly
describe('getJournal()', () => {
  let journalList = [{
    id: '5',
    title: 'title 5',
    entry: 'entry 5',
  }, {
    id: '1',
    title: 'title 1',
    entry: 'entry 1',
  }];

  describe('in ViewModeContainer', () => {
    it('when id exists in props.journalList', () => {
      const validId = '1';
      const props = {
        history: [],
        match: {
          params: {
            id: validId
          }
        }
      };
      const viewModeContainerWrapper = shallow(
        <ViewModeContainer {...props} journalList={journalList} />
      );
      const componentState = viewModeContainerWrapper.instance().state;
      const foundJournal = journalList.find(
        (journal) => journal.id === validId
      );
      expect(componentState.title).toBe(foundJournal.title);
      expect(componentState.entry).toBe(foundJournal.entry);
    });

    it('when id doesn\'t exist in journalList', () => {
      const invalidId = 'invalidId';
      const props = {
        history: [],
        match: {
          params: {
            id: invalidId
          }
        }
      };
      const viewModeContainerWrapper = shallow(
        <ViewModeContainer {...props} journalList={journalList} />
      );
      const componentState = viewModeContainerWrapper.instance().state;
      const foundJournal = journalList.find(
        (journal) => journal.id === invalidId
      );
      expect(componentState.title).toBe('');
      expect(componentState.entry).toBe('');
    });
  });

  describe('in EditModeContainer', () => {
    const mockSetJournalMessage = jest.fn();
    const mockSetWeatherMessage = jest.fn();
    it('when id exists in props.journalList', () => {
      const validId = '1';
      const props = {
        history: [],
        match: {
          params: {
            id: validId
          }
        }
      };
      const editModeContainerWrapper = shallow(
        <EditModeContainer {...props}
          journalList={journalList}
          setJournalMessage={mockSetJournalMessage}
          setWeatherMessage={mockSetWeatherMessage}
        />
      );
      const componentState = editModeContainerWrapper.instance().state;
      const foundJournal = journalList.find(
        (journal) => journal.id === validId
      );
      expect(componentState.title).toBe(foundJournal.title);
      expect(componentState.entry).toBe(foundJournal.entry);
    });

    it('when id doesn\'t exist in journalList', () => {
      const invalidId = 'invalidId';
      const props = {
        history: [],
        match: {
          params: {
            id: invalidId
          }
        }
      };
      const editModeContainerWrapper = shallow(
        <EditModeContainer {...props}
          journalList={journalList}
          setJournalMessage={mockSetJournalMessage}
          setWeatherMessage={mockSetWeatherMessage}
        />
      );
      const componentState = editModeContainerWrapper.instance().state;
      const foundJournal = journalList.find(
        (journal) => journal.id === invalidId
      );
      expect(componentState.title).toBe('');
      expect(componentState.entry).toBe('');
    });
  });
});
