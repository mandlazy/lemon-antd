import React from 'react';
import RadioGroup from './index';
import renderer from 'react-test-renderer';
import { options } from './index.stories';

test('RadioGroup init', () => {
  const component = renderer.create(
    <RadioGroup options={options} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
