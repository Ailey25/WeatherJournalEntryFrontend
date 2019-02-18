import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import 'babel-polyfill';

import { CreateModeContainer } from '../CreateMode';
import { JournalBody } from '../JournalBody';

configure({ adapter: new Adapter() })

describe('CreateModeContainer', () => {
  let wrapper = {};

  beforeEach(() => {
    const props = {
      journalList: [],
      history: [],
      setJournalMessage: jest.fn(),
      setWeatherMessage: jest.fn(),
    }
    wrapper = shallow(
      <CreateModeContainer {...props} />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).not.toBeNull();
  });

  it('renders header correctly', () => {
    const defaultCreateModeHeader = 'Creating journal entry';
    expect(wrapper.find('#journalHeader').text()).toBe(defaultCreateModeHeader);
  });

  describe('renders JournalBody', () => {
    let journalBodyElement = {};

    beforeEach(() => {
      journalBodyElement = wrapper.find('JournalBody');
    });

    it ('correctly', () => {
      expect(journalBodyElement.length).toBe(1);
    });

    it('with empty title', () => {
      const titleElement = journalBodyElement.dive().find('#title');
      expect(titleElement.props().value).toBe('');
    });

    it('with empty entry', () => {
      const entryElement = journalBodyElement.dive().find('#entry');
      expect(entryElement.props().value).toBe('');
    });
  });
});
