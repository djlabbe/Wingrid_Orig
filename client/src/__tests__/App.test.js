import React from 'react';
import { shallow } from 'enzyme';
import App from 'App';
import NavBar from 'components/layout/Navbar';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<App />);
});

it('shows a nav bar', () => {
  expect(wrapped.find(NavBar).length).toEqual(1);
});
