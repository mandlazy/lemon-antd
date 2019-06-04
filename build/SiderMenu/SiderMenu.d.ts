/// <reference types="react" />
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
}
declare const SiderMenu: (props: ISiderMenuProps) => JSX.Element;
export default SiderMenu;
