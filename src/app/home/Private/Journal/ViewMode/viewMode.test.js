import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import 'babel-polyfill';

import { ViewModeContainer } from './index';

configure({ adapter: new Adapter() })

describe('ViewModeContainer', () => {
  it('renders correctly', () => {
    const match = {
      params: {
        id: 'placeholderId'
      }
    };
    const props = {
      journalList: [],
      match: match,
    }
    const wrapper = shallow(
      <ViewModeContainer {...props} />
    );

    expect(wrapper).not.toBeNull();
    expect(wrapper).toMatchSnapshot();
  });
});

// assume getJournal() works
describe('ViewModeContainer', () => {
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
    };
    wrapper = shallow(
      <ViewModeContainer {...props} />
    );
  });

  // states are set based on journal from getJournal()
  // mock the states
  it('renders title that exists correctly', () => {
    let mockState = { title: 'fake title' };
    wrapper.setState({ ...mockState });

    expect(wrapper.find('#journalHeader').text()).toBe(mockState.title);
  });

  it('renders title that DOESN\'T exists correctly', () => {
    let mockState = { title: '' };
    wrapper.setState({ ...mockState });
    const expectedTitle = 'No title!';

    expect(wrapper.find('#journalHeader').text()).toBe(expectedTitle);
  });

  it('renders entry that exists correctly', () => {
    let mockState = { entry: 'fake entry here' };
    wrapper.setState({ ...mockState });

    const entryComponentProps = wrapper.find('#entry').props();
    expect(entryComponentProps.value).toBe(mockState.entry);
  });

  it('renders entry that DOESN\'T exists correctly', () => {
    let mockState = { entry: '' };
    wrapper.setState({ ...mockState });
    const expectedEntry = 'No entry!';

    const entryComponentProps = wrapper.find('#entry').props();
    expect(entryComponentProps.value).toBe(expectedEntry);
  });
});
