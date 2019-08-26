import './style.scss';
import { PureComponent } from 'react';
import { ITableProps } from '../Table';
export interface IEditTableProps extends ITableProps {
    onChange?: (data: any) => void;
    onError?: (error: any) => void;
}
declare class EditableTable extends PureComponent<IEditTableProps> {
    _data: any;
    _errors: any;
    constructor(props: IEditTableProps);
    handleErrors: (rowIndex: number, errors: any, hasError: boolean) => void;
    handleValues: (rowIndex: number, values: any, hasError: boolean) => void;
    handleSave: (ops: any) => void;
    render(): JSX.Element;
}
export default EditableTable;
