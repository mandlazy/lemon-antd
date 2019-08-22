import React from 'react';
import Form from './index';
import renderer from 'react-test-renderer';
import { fields } from './index.stories';

test('CheckboxGroup init', () => {
  const component = renderer.create(
    <Form title='测试一下' fields={fields}/>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
