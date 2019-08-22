import React from 'react';
import DateRangePicker from './index';
import renderer from 'react-test-renderer';

test('CheckboxGroup init', () => {
  const component = renderer.create(
    <DateRangePicker value={{ startTime: undefined, endTime: undefined }}/>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
