import React, { FunctionComponent, ComponentType } from 'react';
import { MenuTheme } from 'antd/lib/menu';
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
    iconComponent?: ComponentType;
    iconOps?: any;
    renderLink?: FunctionComponent<JSX.Element>;
    [propName: string]: any;
}
declare const SiderMenu: React.FunctionComponent<ISiderMenuProps>;
export default SiderMenu;
