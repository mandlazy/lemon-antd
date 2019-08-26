import React from 'react';
import PageLoading from './index';
import renderer from 'react-test-renderer';

test('PageingLoading init', () => {
  const component = renderer.create(
    <PageLoading />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
