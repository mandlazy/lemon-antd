import React from 'react';
import Select from './index';
import renderer from 'react-test-renderer';
import { options } from './index.stories';

test('select init', () => {
  const component = renderer.create(
    <Select options={options} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
