import './style.scss';
import React, { PureComponent } from 'react';
import { WrappedFormUtils, FormComponentProps, GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { ButtonProps } from 'antd/lib/button';
export interface IFieldItem {
    label?: string;
    rules?: any[];
    name: string;
    initialValue?: any;
    viewingValueRender?: (value: string) => {};
    validateOps?: GetFieldDecoratorOptions;
    useDefinedViewingComponent?: boolean;
    fieldType?: 'string' | 'object' | 'array' | 'file';
    [propName: string]: any;
}
export interface IFormProps {
    fields: Array<IFormProps | IFieldItem>;
    form: WrappedFormUtils;
    multiple?: boolean;
    validateWithScroll?: boolean;
    type?: 'horizontal' | 'vertical';
    components?: any;
    validateOps?: any;
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
    renderField: ({ label, rules, name, initialValue, className, fieldType, viewingValueRender, useDefinedViewingComponent, filterZero, validateOps, ...ops }: IFieldItem, index: number) => JSX.Element;
    renderFields: (fields: any[]) => JSX.Element | (JSX.Element | null)[];
    renderForm: (props: any) => JSX.Element;
    renderBtns: () => JSX.Element;
    render(): JSX.Element;
}
declare const _default: import("antd/lib/form/interface").ConnectedComponentClass<typeof DForm, Pick<IFormProps, string | number>>;
export default _default;
