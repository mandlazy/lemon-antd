"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var antd_1 = require("antd");
var react_router_dom_1 = require("react-router-dom");
var SubMenu = antd_1.Menu.SubMenu, Item = antd_1.Menu.Item;
var renderMenuItem = function (_a) {
    var name = _a.name, to = _a.to, title = _a.title, icon = _a.icon;
    return react_1.default.createElement(Item, { key: name }, to ? react_1.default.createElement(react_router_dom_1.Link, { to: to },
        react_1.default.createElement("span", null,
            icon && react_1.default.createElement(antd_1.Icon, { type: icon }),
            react_1.default.createElement("span", null, title))) : react_1.default.createElement("span", null,
        icon && react_1.default.createElement(antd_1.Icon, { type: icon }),
        react_1.default.createElement("span", null, title)));
};
var renderSubMenu = function (_a) {
    var name = _a.name, title = _a.title, icon = _a.icon, children = _a.children;
    return react_1.default.createElement(SubMenu, { key: name, title: react_1.default.createElement("span", null,
            icon && react_1.default.createElement(antd_1.Icon, { type: icon }),
            react_1.default.createElement("span", null, title)) }, children && children.map(function (item) { return item.children && item.children.length > 0 ?
        renderSubMenu(item) : renderMenuItem(item); }));
};
var handleSelectKey = function (items, defaultValue, value) {
    if (defaultValue)
        return defaultValue;
    var item = items.find(function (_a) {
        var to = _a.to;
        return new RegExp('\\/?' + to).test(value);
    }) || {};
    return [item];
};
var SiderMenu = function (props) {
    var menus = props.menus, width = props.width, _a = props.className, className = _a === void 0 ? '' : _a, _b = props.collapsed, collapsed = _b === void 0 ? false : _b, _c = props.theme, theme = _c === void 0 ? 'dark' : _c, defaultSelectKey = props.defaultSelectKey;
    var names = handleSelectKey(menus, defaultSelectKey, window.location.pathname).names;
    return (react_1.default.createElement(antd_1.Layout.Sider, { width: width, trigger: null, collapsible: true, className: 'sider ' + className, collapsed: collapsed },
        react_1.default.createElement(antd_1.Menu, { theme: theme, selectedKeys: names, mode: 'inline' }, menus && menus.map(function (item) { return item.children && item.children.length ?
            renderSubMenu(item) : renderMenuItem(item); }))));
};
exports.default = SiderMenu;
