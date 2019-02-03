import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount, render } from 'enzyme';

import { WeatherStamp } from './index';
import { CREATE, CELCIUS } from '../../../constants';

configure({ adapter: new Adapter() })

const defaultProps = () => ({
  mode: {CREATE},
  isLoading: false,
  cityName: '',
  unit: CELCIUS,
  temp: NaN,
  weather: []
});

const testProps1 = () => ({
  mode: CREATE,
  isLoading: false,
  cityName: 'test city name',
  unit: CELCIUS,
  temp: '0',
  weather: [
    {
      icon: '10d',
      weatherId: '1',
      description: 'Really cold'
    }, {
      icon: '03n',
      weatherId: '2',
      description: 'Rain everywhere'
    }
  ]
});

describe('WeatherStamp [shallow]', () => {
  it('renders without crashing', () => {
    let wrapper = shallow(<WeatherStamp />);

    expect(wrapper).toMatchSnapshot();
  });
});

describe('WeatherStamp [mount]', () => {
  it('renders props correctly', () => {
    let wrapper = mount(<WeatherStamp {...testProps1()} />);

    expect(wrapper).toMatchSnapshot();
  });
});

describe('WeatherStamp with default props', () => {
  it('[shallow]', () => {
    let wrapper = shallow(<WeatherStamp {...defaultProps()} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('[mount]', () => {
    let wrapper = mount(<WeatherStamp {...defaultProps()} />);

    expect(wrapper).toMatchSnapshot();
  });
});
