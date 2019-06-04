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
declare const SiderMenu: {
    (props: ISiderMenuProps): JSX.Element;
    displayName: string;
    __docgenInfo: {
        "description": string;
        "displayName": string;
        "props": {
            "menus": {
                "defaultValue": null;
                "description": string;
                "name": string;
                "required": boolean;
                "type": {
                    "name": string;
                };
            };
            "width": {
                "defaultValue": null;
                "description": string;
                "name": string;
                "required": boolean;
                "type": {
                    "name": string;
                };
            };
            "className": {
                "defaultValue": null;
                "description": string;
                "name": string;
                "required": boolean;
                "type": {
                    "name": string;
                };
            };
            "collapsed": {
                "defaultValue": null;
                "description": string;
                "name": string;
                "required": boolean;
                "type": {
                    "name": string;
                };
            };
            "theme": {
                "defaultValue": null;
                "description": string;
                "name": string;
                "required": boolean;
                "type": {
                    "name": string;
                };
            };
            "currentPath": {
                "defaultValue": null;
                "description": string;
                "name": string;
                "required": boolean;
                "type": {
                    "name": string;
                };
            };
            "defaultSelectKey": {
                "defaultValue": null;
                "description": string;
                "name": string;
                "required": boolean;
                "type": {
                    "name": string;
                };
            };
        };
    };
};
export default SiderMenu;
