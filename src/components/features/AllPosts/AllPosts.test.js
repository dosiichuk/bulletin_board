import React from 'react';
import { shallow } from 'enzyme';
import { AllPostsComponent } from './AllPosts';

describe('Component AllPosts', () => {
  it('should render without crashing', () => {
    const component = shallow(<AllPostsComponent />);
    expect(component).toBeTruthy();
  });
});
