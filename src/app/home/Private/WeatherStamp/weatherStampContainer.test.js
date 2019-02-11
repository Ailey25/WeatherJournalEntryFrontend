import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import 'babel-polyfill';

import { WeatherStampContainer } from './index';
import { WeatherStamp } from './WeatherStamp/index';

configure({ adapter: new Adapter() })

describe('WeatherStampContainer', () => {
  const mockGetWeatherData = jest.fn();

  it('renders 1 weather stamp', () => {
    let wrapper = shallow(
      <WeatherStampContainer getWeatherData={mockGetWeatherData} />
    );
    expect(wrapper.find('WeatherStamp').length).toBe(1);
  });

  it('renders no weather stamp', () => {
    let wrapper = shallow(
      <WeatherStampContainer hide getWeatherData={mockGetWeatherData} />
    );
    expect(wrapper.find('WeatherStamp').length).toBe(0);
  });
});
