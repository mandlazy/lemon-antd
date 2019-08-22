import { PureComponent } from 'react';
import { IOption } from '../utils/Option';
export interface IRadioGroupProps {
    options: Array<IOption | string>;
    [propName: string]: any;
}
declare class RadioGroup extends PureComponent<IRadioGroupProps> {
    render(): JSX.Element;
}
export default RadioGroup;
