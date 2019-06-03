import React from 'react';
import { storiesOf } from '@storybook/react';
import SiderMenu, { IMenuItem } from './index';
import StoryRouter from 'storybook-react-router';

const stories = storiesOf('SiderMenu', module);
const accountChildren: IMenuItem[] = [
  { name: 'accountList', to: '/account/list', icon: 'ordered-list', title: 'AccountList' },
  { name: 'accountDetail', to: '/account/detail', icon: 'ordered-list', title: 'Accountdetail' },
];
export const menus: IMenuItem[] = [
  { name: 'home', to: '/home', icon: 'home', title: 'Home' },
  { name: 'account', to: '/account', icon: 'user', title: 'Account', children: accountChildren  },
  { name: 'order', to: '/order', icon: 'snippets', title: 'Order' },
];

stories.addDecorator(StoryRouter()).add(
  'Common',
  () => (
    <SiderMenu
      currentPath={'/account/list'}
      menus={menus}
    />
  ),
);
