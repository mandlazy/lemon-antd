import { PureComponent } from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
export interface IRowProps {
    form: WrappedFormUtils;
    [propName: string]: any;
}
declare class EditableRow extends PureComponent<IRowProps> {
    render(): JSX.Element;
}
declare const _default: import("antd/lib/form/interface").ConnectedComponentClass<typeof EditableRow, Pick<IRowProps, string | number>>;
export default _default;
