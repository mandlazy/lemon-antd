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
  useDefaultSelectKey?: boolean;
  renderLink?: FunctionComponent<JSX.Element>;
  [propName: string]: any;
}

interface IDefaultKeysOps {
  selectedKeys?: string[];
  openKeys?: string[];
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
}

interface ISelectKeyArg {
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

const sortItem = (menus: IMenuItem[],  sort: string[] = []) => {
  const findIndex = (name: string) => sort.findIndex((item) => item === name);
  return sort ? menus.sort((pre, cur) => {
        return findIndex(pre.name) - findIndex(cur.name);
      })
    : menus;
};

const renderSubMenu = ({ name, title, icon, children, sort }: IMenuItem, renderLink?: FunctionComponent<JSX.Element>) =>
  <SubMenu
      key={ name }
      title={
          <span>
              {icon && <Icon type={ icon }/>}
              <span>{ title }</span>
          </span>
      }>
      {children && sortItem(children, sort).map(
          (item) => item.children && item.children.length > 0 ?
              renderSubMenu(item) : renderMenuItem(item, renderLink)
      )}
  </SubMenu>;

const selectOpsWithUseDefault = (
  useDefault: boolean,
  selectKeys: string[] = [],
  openKeys: string[] = []
): IDefaultKeysOps => {
  const selectOps: IDefaultKeysOps = {};
  if (useDefault) {
    selectOps.defaultOpenKeys = openKeys;
    selectOps.defaultSelectedKeys = selectKeys;
  } else {
    selectOps.openKeys = openKeys;
    selectOps.selectedKeys = selectKeys;
  }
  return selectOps;
};

let selectKeysTemp: ISelectKeyArg = {
  openKeys: [],
  selectedKeys: []
};
const handSubMenuItem = (item: IMenuItem, value: string) => {
  const next = new RegExp('\\/?' + value).test(item.to);
  if (next) selectKeysTemp.selectedKeys.push(item.name);
  selectKeysTemp.next = !next;
};
const handMenuItem =
  (items: IMenuItem[], value: string, useDefault: boolean, pItem?: IMenuItem): IDefaultKeysOps => {
    if (pItem) selectKeysTemp.openKeys.push(pItem.name);
    items.every(({ children, ...item }) => {
      children ? handMenuItem(children, value, useDefault, item) : handSubMenuItem(item, value);
      return selectKeysTemp.next ? true : false;
    });
    const { selectedKeys, openKeys } = selectKeysTemp;
    return selectOpsWithUseDefault(useDefault, selectedKeys, openKeys);
  };

const handleSelectKey = (useDefault: boolean, items: IMenuItem[], value?: string): IDefaultKeysOps => {
  let selectOps: IDefaultKeysOps = selectOpsWithUseDefault(useDefault);
  selectKeysTemp = {
    openKeys: [],
    selectedKeys: []
  };
  if (value) {
    selectOps = handMenuItem(items, value, useDefault);
  }
  return selectOps;
};

const SiderMenu: React.FunctionComponent<ISiderMenuProps> = ({
    menus = [],
    width,
    sort,
    className = '',
    collapsed = false,
    theme = 'dark',
    currentPath,
    defaultSelectKey,
    renderLink,
    useDefaultSelectKey = true,
    ...otherProps
  }) => {
  const selectedOps = handleSelectKey(
    useDefaultSelectKey,
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
        mode='inline'
        { ...selectedOps }
        { ...otherProps }>
        { menus && sortItem(menus, sort).map(
            (item) => item.children && item.children.length ?
              renderSubMenu(item, renderLink) : renderMenuItem(item, renderLink)
        )}
      </Menu>
    </Layout.Sider>
  );
};

export default SiderMenu;
