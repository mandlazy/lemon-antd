/// <reference types="react" />
import './style.scss';
export interface ITableProps {
    columns: any[];
    components?: object;
    fixed?: boolean;
    data?: any[];
    pagination?: object | false;
    [propName: string]: any;
}
export interface IColProps {
    width?: number;
    [propName: string]: any;
}
declare function Table(props: ITableProps): JSX.Element;
export default Table;
