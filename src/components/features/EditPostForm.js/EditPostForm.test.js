import React from 'react';
import { shallow } from 'enzyme';
import { EditPostFormComponent } from './AddPostForm';

describe('Component EditPostForm', () => {
  it('should render without crashing', () => {
    const component = shallow(<EditPostFormComponent />);
    expect(component).toBeTruthy();
  });
});
