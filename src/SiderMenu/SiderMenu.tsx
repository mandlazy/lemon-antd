import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { MenuTheme } from 'antd/lib/menu';
import { Link } from 'react-router-dom';

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
}

interface IDefaultKeysArgs {
  selectedKeys: string[];
  openKeys: string[];
  next?: boolean;
}

const renderMenuItem = ({ name, to, title, icon }: IMenuItem) =>
  <Item key={ name }>
    { to ? <Link to={ to }>
            <span>
              {icon && <Icon type={ icon } />}
              <span>{title}</span>
            </span>
          </Link> : <span>
                      {icon && <Icon type={ icon } />}
                      <span>{ title }</span>
                    </span>}
  </Item>;

const renderSubMenu = ({ name, title, icon, children }: IMenuItem) =>
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
              renderSubMenu(item) : renderMenuItem(item)
      )}
  </SubMenu>;

const handSubMenuItem= (item:IMenuItem, value:string, selectKey:IDefaultKeysArgs) => {
  const ret = new RegExp('\\/?' + value).test(item.to);
  ret && selectKey.selectedKeys.push(item.name);
  selectKey.next = !ret;
  return selectKey;
};

const handMenuItem = (items: IMenuItem[], value: string, selectKey:IDefaultKeysArgs, pItem?:IMenuItem):IDefaultKeysArgs => {
  pItem && selectKey.openKeys.push(pItem.name);
  items.every(({ children, ...item }) => {
    selectKey = children ? handMenuItem(children, value, selectKey, item) : handSubMenuItem(item, value, selectKey);
    return selectKey.next ? true : false;
  });
  return selectKey;
};

const handleSelectKey = (items: IMenuItem[], value?: string):IDefaultKeysArgs => {
  let selectKey:IDefaultKeysArgs = {
    selectedKeys: [],
    openKeys: []
  };
  if (value) {
    selectKey = handMenuItem(items, value, selectKey);
  }
  return selectKey;
};

const sortMenuItems = (items: IMenuItem[], rules: string[]): IMenuItem[] => {
  return items;
};

const SiderMenu = (props: ISiderMenuProps) => {
  const {
    menus,
    width,
    className = '',
    collapsed = false,
    theme = 'dark',
    currentPath,
    defaultSelectKey } = props;  
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
                renderSubMenu(item) : renderMenuItem(item)
        )}
      </Menu>
    </Layout.Sider>
  );
};

export default SiderMenu;
