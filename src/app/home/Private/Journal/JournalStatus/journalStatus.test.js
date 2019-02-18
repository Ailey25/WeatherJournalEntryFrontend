import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount} from 'enzyme';

import { JournalStatus } from '../JournalStatus';

configure({ adapter: new Adapter() })

describe('JournalStatus', () => {
  it('with isPosting', () => {
    const wrapper = shallow(<JournalStatus isPosting />);
    expect(wrapper.text()).toBe('Loading results...');
    expect(wrapper.exists('#journalStatusMessage')).toBe(false);
  });

  it('with no messages', () => {
    const wrapper = shallow(<JournalStatus />);
    expect(wrapper.equals(<div></div>)).toBe(true);
  });

  it('with messages', () => {
    const messages = [
      'message1', 'message2'
    ];
    const wrapper = shallow(<JournalStatus messages={messages} />);
    const journalStatusMessageWrapper = wrapper.find('#journalStatusMessage');
    const texts = journalStatusMessageWrapper.children().map(node => node.text());
    expect(texts).toEqual(messages);
  });
});
