import './style.scss';
import React, { PureComponent } from 'react';
import { WrappedFormUtils, FormComponentProps } from 'antd/lib/form/Form';
import { ButtonProps } from 'antd/lib/button';
export interface IFieldItem {
    label?: string;
    rules?: any[];
    name: string;
    initialValue?: any;
    fieldType?: 'string' | 'object' | 'array' | 'file';
    [propName: string]: any;
}
export interface IFormProps {
    fields: Array<IFormProps | IFieldItem>;
    form: WrappedFormUtils;
    multiple?: boolean;
    type?: 'horizontal' | 'vertical';
    components?: JSX.Element[];
    onCancel?: () => {};
    onSubmit?: (t: object) => {};
    initialValues?: any;
    title?: string;
    titleDividerLine?: boolean;
    footerDividerLine?: boolean;
    btns?: IBtnProps[];
    submitButtonText?: string;
    cabcelButtonText?: string;
    [propName: string]: any;
}
interface IBtnProps extends ButtonProps {
    text: string;
    [propName: string]: any;
}
declare class DForm extends PureComponent<IFormProps & FormComponentProps> {
    defaultBtns: IBtnProps[];
    cancelBtn: IBtnProps;
    constructor(props: IFormProps);
    handleCancel: () => void;
    handleSubmit: (e: React.FormEvent<Element>) => void;
    renderField: ({ label, rules, name, initialValue, className, fieldType, ...ops }: IFieldItem) => JSX.Element;
    renderFields: (fields: any[]) => JSX.Element | JSX.Element[];
    renderForm: (fields: any[], index: any, title?: string | undefined) => JSX.Element;
    renderBtns: () => JSX.Element;
    render(): JSX.Element;
}
declare const _default: import("antd/lib/form/interface").ConnectedComponentClass<typeof DForm, Pick<IFormProps, string | number>>;
export default _default;
