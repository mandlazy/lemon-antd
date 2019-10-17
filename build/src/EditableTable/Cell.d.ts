import { PureComponent } from 'react';
import { IColProps } from '../Table';
declare class EditCell extends PureComponent<IColProps> {
    form: any;
    firstRending: boolean;
    constructor(props: IColProps);
    change: (value: any, dataIndex: string, rowIndex: number) => void;
    renderField: (ops: any) => JSX.Element;
    save: (name: string, rowIndex: number) => void;
    _renderFieldViewing: (ops: any) => JSX.Element;
    renderCell: (values: any) => any;
    render(): JSX.Element;
}
export default EditCell;
