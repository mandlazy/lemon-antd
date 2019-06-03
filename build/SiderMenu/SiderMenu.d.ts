/// <reference types="react" />
export interface IMenuItem {
    name: string;
    to: string;
    title: string;
    icon: string;
    children?: IMenuItem[];
}
export interface ISiderMenuProps {
    menus: IMenuItem[];
    [propName: string]: any;
}
declare const SiderMenu: (props: ISiderMenuProps) => JSX.Element;
export default SiderMenu;
