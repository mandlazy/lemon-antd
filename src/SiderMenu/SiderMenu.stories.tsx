import React, { Children } from 'react';
import { storiesOf } from '@storybook/react';
import SiderMenu, { IMenuItem } from './index';
import StoryRouter from 'storybook-react-router';
import { Link } from 'react-router-dom';

const stories = storiesOf('SiderMenu', module);
const accountChildren: IMenuItem[] = [
  { name: 'accountList', to: '/account/list', icon: 'ordered-list', title: 'AccountList' },
  { name: 'accountDetail', to: '/account/detail', icon: 'ordered-list', title: 'Accountdetail' },
];
export const menus: IMenuItem[] = [
  { name: 'home', to: '/home', icon: 'home', title: 'Home' },
  {
    name: 'account',
    icon: 'user',
    to: '/account',
    title: 'Account',
    children: accountChildren,
    sort: ['accountDetail', 'accountList']
  },
  { name: 'order', to: '/order', icon: 'snippets', title: 'Order' },
];

stories.addDecorator(StoryRouter()).add(
  'Common',
  () => (
    <SiderMenu
      sort={['account', 'home', 'order']}
      renderLink={(children, to) => (<Link to={to}>{children}</Link>)}
      currentPath={'/account/list'}
      menus={menus}
    />
  ),
);
