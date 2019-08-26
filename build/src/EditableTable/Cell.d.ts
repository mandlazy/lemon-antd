import { PureComponent } from 'react';
import { IColProps } from '../Table';
declare class EditCell extends PureComponent<IColProps> {
    form: any;
    constructor(props: IColProps);
    renderField: (ops: any) => JSX.Element;
    save: (name: string, rowIndex: number) => void;
    renderCell: (value: any) => JSX.Element;
    render(): JSX.Element;
}
export default EditCell;
