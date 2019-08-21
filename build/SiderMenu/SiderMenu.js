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
const sortItem = (menus, sort = []) => {
    const findIndex = (name) => sort.findIndex((item) => item === name);
    return sort ? menus.sort((pre, cur) => {
        return findIndex(pre.name) - findIndex(cur.name);
    })
        : menus;
};
const renderSubMenu = ({ name, title, icon, children, sort }, renderLink) => React.createElement(SubMenu, { key: name, title: React.createElement("span", null,
        icon && React.createElement(Icon, { type: icon }),
        React.createElement("span", null, title)) }, children && sortItem(children, sort).map((item) => item.children && item.children.length > 0 ?
    renderSubMenu(item) : renderMenuItem(item, renderLink)));
const selectOpsWithUseDefault = (useDefault, selectKeys = [], openKeys = []) => {
    const selectOps = {};
    if (useDefault) {
        selectOps.defaultOpenKeys = openKeys;
        selectOps.defaultSelectedKeys = selectKeys;
    }
    else {
        selectOps.openKeys = openKeys;
        selectOps.selectedKeys = selectKeys;
    }
    return selectOps;
};
const selectKeysTemp = {
    openKeys: [],
    selectedKeys: []
};
const handSubMenuItem = (item, value) => {
    const next = new RegExp('\\/?' + value).test(item.to);
    if (next)
        selectKeysTemp.selectedKeys.push(item.name);
    selectKeysTemp.next = !next;
};
const handMenuItem = (items, value, useDefault, pItem) => {
    if (pItem)
        selectKeysTemp.openKeys.push(pItem.name);
    items.every(({ children, ...item }) => {
        children ? handMenuItem(children, value, useDefault, item) : handSubMenuItem(item, value);
        return selectKeysTemp.next ? true : false;
    });
    const { selectedKeys, openKeys } = selectKeysTemp;
    return selectOpsWithUseDefault(useDefault, selectedKeys, openKeys);
};
const handleSelectKey = (useDefault, items, value) => {
    let selectOps = selectOpsWithUseDefault(useDefault);
    if (value) {
        selectOps = handMenuItem(items, value, useDefault);
    }
    return selectOps;
};
const SiderMenu = ({ menus = [], width, sort, className = '', collapsed = false, theme = 'dark', currentPath, defaultSelectKey, renderLink, useDefaultSelectKey = true, ...otherProps }) => {
    const selectedOps = handleSelectKey(useDefaultSelectKey, menus, defaultSelectKey || currentPath);
    return (React.createElement(Layout.Sider, { width: width, trigger: null, collapsible: true, className: 'sider ' + className, collapsed: collapsed },
        React.createElement(Menu, Object.assign({ theme: theme, mode: 'inline' }, selectedOps, otherProps), menus && sortItem(menus, sort).map((item) => item.children && item.children.length ?
            renderSubMenu(item, renderLink) : renderMenuItem(item, renderLink)))));
};
export default SiderMenu;
//# sourceMappingURL=SiderMenu.js.map