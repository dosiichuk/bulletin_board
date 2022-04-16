import React from 'react';
import { shallow } from 'enzyme';
import { PaperComponent } from './Paper';

describe('Component Paper', () => {
  it('should render without crashing', () => {
    const component = shallow(<PaperComponent />);
    expect(component).toBeTruthy();
  });
});
