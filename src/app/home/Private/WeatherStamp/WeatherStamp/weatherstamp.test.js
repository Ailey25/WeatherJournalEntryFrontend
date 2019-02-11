import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, } from 'enzyme';

import { WeatherStamp } from './index';
import { CREATE, CELCIUS } from '../../../constants';

configure({ adapter: new Adapter() })

describe('WeatherStamp', () => {
  it('renders correctly', () => {
    let wrapper = shallow(<WeatherStamp />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('WeatherStamp props', () => {
  it ('renders 1 temp', () => {
    let wrapper = shallow(<WeatherStamp temp={0} />);
    expect(wrapper.find('#temp').length).toBe(1);
  });

  it ('renders 1 temp unit', () => {
    let wrapper = shallow(<WeatherStamp unit={CELCIUS} />);
    expect(wrapper.find('#unit').length).toBe(1);
  });

  describe('weathers', () => {
    it('renders 0 weather', () => {
      let wrapper = shallow(<WeatherStamp weathers={[]} />);
      expect(wrapper.find('img').length).toBe(0);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders 1 weather', () => {
      let wrapper = shallow(<WeatherStamp weathers={[{
        icon: '10d',
        weatherId: '1',
        description: 'Really cold'
      }]} />);
      expect(wrapper.find('img').length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
