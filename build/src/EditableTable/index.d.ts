import './style.scss';
import { PureComponent } from 'react';
import { ITableProps } from '../Table';
export interface IEditTableProps extends ITableProps {
    onChange?: (data: any, error: any, values: any) => void;
    onError?: (error: any) => void;
    onInputChange?: (values: any) => void;
}
declare class EditableTable extends PureComponent<IEditTableProps> {
    _data: any;
    _allData: any;
    _errors: any;
    forms: any;
    handleErrors: (rowIndex: number, errors: any, hasError: boolean) => void;
    handleValues: (rowIndex: number, values: any, hasError: boolean) => void;
    handleSave: (ops: any) => void;
    handleChange: (values: any, rowIndex: number) => void;
    addForm: (form: any) => void;
    render(): JSX.Element;
}
export default EditableTable;
