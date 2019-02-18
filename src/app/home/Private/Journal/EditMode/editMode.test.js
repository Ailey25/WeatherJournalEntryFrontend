import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import 'babel-polyfill';

import { EditModeContainer } from '../EditMode';
import { JournalBody } from '../JournalBody';

configure({ adapter: new Adapter() })

describe('EditModeContainer', () => {
  it('renders correctly', () => {
    const match = {
      params: {
        id: 'placeholderId'
      }
    };
    const props = {
      journalList: [],
      match: match,
      setJournalMessage: jest.fn(),
      setWeatherMessage: jest.fn(),
    };
    const wrapper = shallow(
      <EditModeContainer {...props} />
    );

    expect(wrapper).not.toBeNull();
    const journalHeader = 'Editing journal entry';
    expect(wrapper.find('#journalHeader').text()).toBe(journalHeader);
  });
});

// assume this.getJournal() method works
// mock the states that are set by getJournal()
describe('EditModeContainer', () => {
  let props = {};
  let wrapper = {};

  beforeEach(() => {
    props = {
      journalList: [],
      history: [],
      match: {
        params: {
          id: 'placeholderId'
        }
      },
      setJournalMessage: jest.fn(),
      setWeatherMessage: jest.fn(),
    };
    wrapper = shallow(
      <EditModeContainer {...props} />
    );
  });

  it('sets rendered title with value correctly', () => {
    let mockState = { title: 'fake title' };
    wrapper.setState({ ...mockState });

    let journalBodyWrapper = wrapper.find('JournalBody');
    expect(journalBodyWrapper.props().title).toBe(mockState.title);
  });

  it('sets rendered entry with value correctly', () => {
    let mockState = { entry: 'fake entry' };
    wrapper.setState({ ...mockState });

    let journalBodyWrapper = wrapper.find('JournalBody');
    expect(journalBodyWrapper.props().entry).toBe(mockState.entry);
  });
});
