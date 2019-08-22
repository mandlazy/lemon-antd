import React from 'react';
import CheckboxGroup from './index';
import renderer from 'react-test-renderer';
import { options } from './index.stories';

test('CheckboxGroup init', () => {
  const component = renderer.create(
    <CheckboxGroup options={options} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
