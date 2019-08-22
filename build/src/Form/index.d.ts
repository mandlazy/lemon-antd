import './style.scss';
import React, { Component } from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
export interface IFieldItem {
    label?: string;
    rules?: any[];
    name: string;
    initialValue?: any;
    fieldType?: 'string' | 'object' | 'array' | 'file';
    [propName: string]: any;
}
export interface IFormProps {
    fields: IFieldItem[];
    form: WrappedFormUtils;
    type?: 'horizontal' | 'vertical';
    components?: JSX.Element[];
    onCancel?: () => {};
    onSubmit?: (t: object) => {};
    initialValues?: any;
    title?: string;
    dividerLine?: boolean;
    btns?: JSX.Element[];
    submitButtonText?: string;
    cabcelButtonText?: string;
    [propName: string]: any;
}
declare class DForm extends Component<IFormProps & {
    form: WrappedFormUtils;
}> {
    constructor(props: IFormProps);
    handleCancel: () => void;
    handleSubmit: (e: React.FormEvent<Element>) => void;
    renderField: ({ label, rules, name, initialValue, fieldType, ...ops }: IFieldItem) => JSX.Element;
    renderFields: (fields: any[]) => JSX.Element | JSX.Element[];
    render(): JSX.Element;
}
declare const _default: import("antd/lib/form/interface").ConnectedComponentClass<typeof DForm, Pick<IFormProps, string | number>>;
export default _default;
