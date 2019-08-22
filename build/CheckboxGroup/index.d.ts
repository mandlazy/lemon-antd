import { PureComponent } from 'react';
import { IOption } from '../utils/Option';
export interface ICheckboxGroupProps {
    options: Array<IOption | string>;
    [propName: string]: any;
}
declare class CheckboxGroup extends PureComponent<ICheckboxGroupProps> {
    render(): JSX.Element;
}
export default CheckboxGroup;
