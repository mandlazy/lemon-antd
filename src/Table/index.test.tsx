import React from 'react';
import Table from './index';
import renderer from 'react-test-renderer';
import { columns } from './index.stories';

test('Table init', () => {
  const component = renderer.create(
    <Table columns={columns} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
