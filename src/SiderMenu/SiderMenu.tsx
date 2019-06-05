import React, { FunctionComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { MenuTheme } from 'antd/lib/menu';
import Link from '../Link/Link';

const {  SubMenu, Item } = Menu;

export interface IMenuItem {
  name: string;
  to: string;
  title: string;
  icon: string;
  sort?: string[];
  children?: IMenuItem[];
}

export interface ISiderMenuProps {
  menus: IMenuItem[];
  width?: number;
  className?: string;
  collapsed?: boolean;
  theme?: MenuTheme;
  currentPath?: string;
  defaultSelectKey?: string;
  renderLink?: FunctionComponent<JSX.Element>;
}

interface IDefaultKeysArgs {
  selectedKeys: string[];
  openKeys: string[];
  next?: boolean;
}

const handleLinkComponent = ({ name, to, title, icon }: IMenuItem, wrap?: FunctionComponent<JSX.Element>) => {
  const defaultComp = (
    <span>
      {icon && <Icon type={ icon } />}
      <span>{title}</span>
    </span>
  );
  return wrap !== undefined ? wrap(defaultComp, to) : defaultComp;
};

const renderMenuItem = (menuItem: IMenuItem, renderLink?: FunctionComponent<JSX.Element>) => {
  const { name, to } = menuItem;
  let wrap;
  if (to) {
    wrap = renderLink || ((children: JSX.Element) => (<Link to={to}>{ children }</Link>));
  }
  return (
    <Item key={ name }>
      { handleLinkComponent(menuItem, wrap) }
    </Item>
  );
};

const renderSubMenu = ({ name, title, icon, children }: IMenuItem, renderLink?: FunctionComponent<JSX.Element>) =>
  <SubMenu
      key={ name }
      title={
          <span>
              {icon && <Icon type={ icon }/>}
              <span>{ title }</span>
          </span>
      }>
      {children && children.map(
          (item) => item.children && item.children.length > 0 ?
              renderSubMenu(item) : renderMenuItem(item, renderLink)
      )}
  </SubMenu>;

const handSubMenuItem = (item: IMenuItem, value: string, selectKey: IDefaultKeysArgs) => {
  const next = new RegExp('\\/?' + value).test(item.to);
  if (next) selectKey.selectedKeys.push(item.name);
  selectKey.next = !next;
  return selectKey;
};

const handMenuItem =
  (items: IMenuItem[], value: string, selectKey: IDefaultKeysArgs, pItem?: IMenuItem): IDefaultKeysArgs => {
    if (pItem) selectKey.openKeys.push(pItem.name);
    items.every(({ children, ...item }) => {
      selectKey = children ? handMenuItem(children, value, selectKey, item) : handSubMenuItem(item, value, selectKey);
      return selectKey.next ? true : false;
    });
    return selectKey;
  };

const handleSelectKey = (items: IMenuItem[], value?: string): IDefaultKeysArgs => {
  let selectKey: IDefaultKeysArgs = {
    openKeys: [],
    selectedKeys: []
  };
  if (value) {
    selectKey = handMenuItem(items, value, selectKey);
  }
  return selectKey;
};

const SiderMenu: React.FunctionComponent<ISiderMenuProps> = ({
    menus,
    width,
    className = '',
    collapsed = false,
    theme = 'dark',
    currentPath,
    defaultSelectKey,
    renderLink
  }) => {
  const { selectedKeys, openKeys } = handleSelectKey(
    menus,
    defaultSelectKey || currentPath
  );
  return (
    <Layout.Sider
      width={width}
      trigger={null}
      collapsible
      className={'sider ' + className}
      collapsed={collapsed}>
      <Menu
        theme={theme}
        defaultSelectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        mode='inline'>
        { menus && menus.map(
            (item) => item.children && item.children.length ?
                renderSubMenu(item, renderLink) : renderMenuItem(item, renderLink)
        )}
      </Menu>
    </Layout.Sider>
  );
};

export default SiderMenu;
