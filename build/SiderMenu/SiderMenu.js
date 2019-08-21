import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import Link from '../Link/Link';
const { SubMenu, Item } = Menu;
const handleLinkComponent = ({ name, to, title, icon }, wrap) => {
    const defaultComp = (React.createElement("span", null,
        icon && React.createElement(Icon, { type: icon }),
        React.createElement("span", null, title)));
    return wrap !== undefined ? wrap(defaultComp, to) : defaultComp;
};
const renderMenuItem = (menuItem, renderLink) => {
    const { name, to } = menuItem;
    let wrap;
    if (to) {
        wrap = renderLink || ((children) => (React.createElement(Link, { to: to }, children)));
    }
    return (React.createElement(Item, { key: name }, handleLinkComponent(menuItem, wrap)));
};
const renderSubMenu = ({ name, title, icon, children }, renderLink) => React.createElement(SubMenu, { key: name, title: React.createElement("span", null,
        icon && React.createElement(Icon, { type: icon }),
        React.createElement("span", null, title)) }, children && children.map((item) => item.children && item.children.length > 0 ?
    renderSubMenu(item) : renderMenuItem(item, renderLink)));
const handSubMenuItem = (item, value, selectKey) => {
    const next = new RegExp('\\/?' + value).test(item.to);
    if (next)
        selectKey.selectedKeys.push(item.name);
    selectKey.next = !next;
    return selectKey;
};
const handMenuItem = (items, value, selectKey, pItem) => {
    if (pItem)
        selectKey.openKeys.push(pItem.name);
    items.every(({ children, ...item }) => {
        selectKey = children ? handMenuItem(children, value, selectKey, item) : handSubMenuItem(item, value, selectKey);
        return selectKey.next ? true : false;
    });
    return selectKey;
};
const handleSelectKey = (items, value) => {
    let selectKey = {
        openKeys: [],
        selectedKeys: []
    };
    if (value) {
        selectKey = handMenuItem(items, value, selectKey);
    }
    return selectKey;
};
const SiderMenu = ({ menus = [], width, className = '', collapsed = false, theme = 'dark', currentPath, defaultSelectKey, renderLink }) => {
    const { selectedKeys, openKeys } = handleSelectKey(menus, defaultSelectKey || currentPath);
    return (React.createElement(Layout.Sider, { width: width, trigger: null, collapsible: true, className: 'sider ' + className, collapsed: collapsed },
        React.createElement(Menu, { theme: theme, defaultSelectedKeys: selectedKeys, defaultOpenKeys: openKeys, mode: 'inline' }, menus && menus.map((item) => item.children && item.children.length ?
            renderSubMenu(item, renderLink) : renderMenuItem(item, renderLink)))));
};
export default SiderMenu;
//# sourceMappingURL=SiderMenu.js.map