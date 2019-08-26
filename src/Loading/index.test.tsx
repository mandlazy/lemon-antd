import React from 'react';
import Loading from './Loading';
import renderer from 'react-test-renderer';

test('Loading init', () => {
  const component = renderer.create(
    <Loading />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
