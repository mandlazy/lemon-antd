/// <reference types="react" />
import './style.scss';
export interface ITableProps {
    columns: any[];
    components?: object;
    fixed?: boolean;
    data?: any[];
    fixedWidth?: boolean;
    pagination?: object | false;
    [propName: string]: any;
}
export interface IColProps {
    width?: number;
    [propName: string]: any;
}
declare function Table(props: ITableProps): JSX.Element;
declare namespace Table {
    var displayName: string;
    var __docgenInfo: {
        "description": string;
        "displayName": string;
        "props": {
            "columns": {
                "defaultValue": null;
                "description": string;
                "name": string;
                "required": boolean;
                "type": {
                    "name": string;
                };
            };
            "components": {
                "defaultValue": null;
                "description": string;
                "name": string;
                "required": boolean;
                "type": {
                    "name": string;
                };
            };
            "fixed": {
                "defaultValue": null;
                "description": string;
                "name": string;
                "required": boolean;
                "type": {
                    "name": string;
                };
            };
            "data": {
                "defaultValue": null;
                "description": string;
                "name": string;
                "required": boolean;
                "type": {
                    "name": string;
                };
            };
            "fixedWidth": {
                "defaultValue": null;
                "description": string;
                "name": string;
                "required": boolean;
                "type": {
                    "name": string;
                };
            };
            "pagination": {
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
}
export default Table;
