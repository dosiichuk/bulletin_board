import React from 'react';
import { shallow } from 'enzyme';
import { AddPostFormComponent } from './AddPostForm';

describe('Component AddPostForm', () => {
  it('should render without crashing', () => {
    const component = shallow(<AddPostFormComponent />);
    expect(component).toBeTruthy();
  });
});
