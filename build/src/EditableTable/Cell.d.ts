import { PureComponent } from 'react';
import { IColProps } from '../Table';
declare class EditCell extends PureComponent<IColProps> {
    form: any;
    firstRending: boolean;
    constructor(props: IColProps);
    renderField: (ops: any) => JSX.Element;
    change: (value: any, dataIndex: string, rowIndex: number) => void;
    save: (name: string, rowIndex: number) => void;
    _renderFieldViewing: (ops: any) => JSX.Element;
    renderCell: (values: any) => JSX.Element;
    render(): JSX.Element;
}
export default EditCell;
