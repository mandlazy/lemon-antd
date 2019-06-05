"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
var Link_1 = __importDefault(require("../Link/Link"));
var SubMenu = antd_1.Menu.SubMenu, Item = antd_1.Menu.Item;
var handleLinkComponent = function (_a, wrap) {
    var name = _a.name, to = _a.to, title = _a.title, icon = _a.icon;
    var defaultComp = (react_1.default.createElement("span", null,
        icon && react_1.default.createElement(antd_1.Icon, { type: icon }),
        react_1.default.createElement("span", null, title)));
    return wrap !== undefined ? wrap(defaultComp, to) : defaultComp;
};
var renderMenuItem = function (menuItem, renderLink) {
    var name = menuItem.name, to = menuItem.to;
    var wrap;
    if (to) {
        wrap = renderLink || (function (children) { return (react_1.default.createElement(Link_1.default, { to: to }, children)); });
    }
    return (react_1.default.createElement(Item, { key: name }, handleLinkComponent(menuItem, wrap)));
};
var renderSubMenu = function (_a, renderLink) {
    var name = _a.name, title = _a.title, icon = _a.icon, children = _a.children;
    return react_1.default.createElement(SubMenu, { key: name, title: react_1.default.createElement("span", null,
            icon && react_1.default.createElement(antd_1.Icon, { type: icon }),
            react_1.default.createElement("span", null, title)) }, children && children.map(function (item) { return item.children && item.children.length > 0 ?
        renderSubMenu(item) : renderMenuItem(item, renderLink); }));
};
var handSubMenuItem = function (item, value, selectKey) {
    var next = new RegExp('\\/?' + value).test(item.to);
    if (next)
        selectKey.selectedKeys.push(item.name);
    selectKey.next = !next;
    return selectKey;
};
var handMenuItem = function (items, value, selectKey, pItem) {
    if (pItem)
        selectKey.openKeys.push(pItem.name);
    items.every(function (_a) {
        var children = _a.children, item = __rest(_a, ["children"]);
        selectKey = children ? handMenuItem(children, value, selectKey, item) : handSubMenuItem(item, value, selectKey);
        return selectKey.next ? true : false;
    });
    return selectKey;
};
var handleSelectKey = function (items, value) {
    var selectKey = {
        openKeys: [],
        selectedKeys: []
    };
    if (value) {
        selectKey = handMenuItem(items, value, selectKey);
    }
    return selectKey;
};
var SiderMenu = function (_a) {
    var menus = _a.menus, width = _a.width, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.collapsed, collapsed = _c === void 0 ? false : _c, _d = _a.theme, theme = _d === void 0 ? 'dark' : _d, currentPath = _a.currentPath, defaultSelectKey = _a.defaultSelectKey, renderLink = _a.renderLink;
    var _e = handleSelectKey(menus, defaultSelectKey || currentPath), selectedKeys = _e.selectedKeys, openKeys = _e.openKeys;
    return (react_1.default.createElement(antd_1.Layout.Sider, { width: width, trigger: null, collapsible: true, className: 'sider ' + className, collapsed: collapsed },
        react_1.default.createElement(antd_1.Menu, { theme: theme, defaultSelectedKeys: selectedKeys, defaultOpenKeys: openKeys, mode: 'inline' }, menus && menus.map(function (item) { return item.children && item.children.length ?
            renderSubMenu(item, renderLink) : renderMenuItem(item, renderLink); }))));
};
exports.default = SiderMenu;
//# sourceMappingURL=SiderMenu.js.map