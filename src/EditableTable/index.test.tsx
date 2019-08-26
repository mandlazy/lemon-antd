import React from 'react';
import EditTable from './index';
import renderer from 'react-test-renderer';
import { columns } from './index.stories';

test('EditTable init', () => {
  const component = renderer.create(
    <EditTable columns={columns} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
