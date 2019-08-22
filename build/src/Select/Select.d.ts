import { PureComponent } from 'react';
import { IOption } from '../utils/Option';
export interface ISelectProps {
    options: Array<IOption | string>;
    [propName: string]: any;
}
declare class Select extends PureComponent<ISelectProps> {
    static defaultProps: {
        width: number;
    };
    render(): JSX.Element;
}
export default Select;
