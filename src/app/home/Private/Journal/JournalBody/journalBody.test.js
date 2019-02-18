import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount} from 'enzyme';

import { JournalBody } from '../JournalBody';

configure({ adapter: new Adapter() })

describe('JournalBody', () => {
  let props = {
    title: 'test title',
    entry: 'test entry'
  }

  it('renders correctly', () => {
    const wrapper = shallow(<JournalBody />);
    expect(wrapper).toMatchSnapshot();
  });

  it ('renders 1 title with correct value', () => {
    const wrapper = shallow(<JournalBody {...props}/>);
    const titleElement = wrapper.find('#title');
    expect(titleElement.length).toBe(1);
    expect(titleElement.props().value).toBe(props.title);
  });

  it ('renders 1 entry with correct value', () => {
    const wrapper = shallow(<JournalBody {...props}/>);
    const entryElement = wrapper.find('#entry');
    expect(entryElement.length).toBe(1);
    expect(entryElement.props().value).toBe(props.entry);
  });
});

describe('onChange', () => {
  describe('title', () => {
    let testProps = {};
    let journalBodyWrapper = {};

    beforeEach(() => {
      testProps = {
        handleChange: jest.fn(),
      }
      journalBodyWrapper = mount(
        <JournalBody handleChange={testProps.handleChange} />
      );
    });

    it('when there is onChange event', () => {
      const titleWrapperLength = journalBodyWrapper.find('#title').length;
      const titleWrapper = journalBodyWrapper.find('#title').at(titleWrapperLength - 1);
      const event = {
        currentTarget: {
          id: titleWrapper.props().id,
          value: "some title entered"
        }
      };
      expect(titleWrapper.simulate('change', event));
      expect(testProps.handleChange).toHaveBeenCalledTimes(1);
    });

    it('when there is no onChange event', () => {
      const titleWrapperLength = journalBodyWrapper.find('#title').length;
      const titleWrapper = journalBodyWrapper.find('#title').at(titleWrapperLength - 1);
      expect(testProps.handleChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('entry', () => {
    let testProps = {};
    let journalBodyWrapper = {};

    beforeEach(() => {
      testProps = {
        handleChange: jest.fn(),
      }
      journalBodyWrapper = mount(
        <JournalBody handleChange={testProps.handleChange} />
      );
    });

    it('when there is onChange event', () => {
      const titleWrapperLength = journalBodyWrapper.find('#entry').length;
      const titleWrapper = journalBodyWrapper.find('#entry').at(titleWrapperLength - 1);
      const event = {
        currentTarget: {
          id: titleWrapper.props().id,
          value: "some entry entered"
        }
      };
      expect(titleWrapper.simulate('change', event));
      expect(testProps.handleChange).toHaveBeenCalledTimes(1);
    });

    it('when there is no onChange event', () => {
      const titleWrapperLength = journalBodyWrapper.find('#entry').length;
      const titleWrapper = journalBodyWrapper.find('#entry').at(titleWrapperLength - 1);
      expect(testProps.handleChange).toHaveBeenCalledTimes(0);
    });
  });
});
