import React from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
export interface IRowProps {
    form: WrappedFormUtils;
    [propName: string]: any;
}
declare const _default: import("antd/lib/form/interface").ConnectedComponentClass<(props: IRowProps) => JSX.Element, Pick<IRowProps, React.ReactText>>;
export default _default;
