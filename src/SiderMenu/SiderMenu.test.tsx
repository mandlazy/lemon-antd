import React from 'react';
import SiderMenu from './index';
import renderer from 'react-test-renderer';
import { menus } from './SiderMenu.stories';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <SiderMenu menus={menus} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
