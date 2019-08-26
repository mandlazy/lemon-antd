import React from 'react';
import Nomatch from './index';
import renderer from 'react-test-renderer';

test('Loading init', () => {
  const component = renderer.create(
    <Nomatch />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
