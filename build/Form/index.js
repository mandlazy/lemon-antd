import './style.scss';
import React, { Component } from 'react';
import { Form, Button, Divider } from 'antd';
import { COMMON_FILELDS } from '../data/fields';
const FILELDS = COMMON_FILELDS;
const _renderField = (ops) => {
    const { type = 'input', ...props } = ops;
    const resType = type;
    return FILELDS[resType]({ ...props });
};
const trimRule = {
    transform: (value) => {
        if (typeof value === 'string')
            return value.trim();
        if (typeof value === 'number')
            return value.toString();
    }
};
class DForm extends Component {
    constructor(props) {
        super(props);
        this.handleCancel = () => {
            const { onCancel, form } = this.props;
            form.resetFields();
            if (onCancel) {
                onCancel();
            }
        };
        this.handleSubmit = (e) => {
            if (e) {
                e.preventDefault();
            }
            const { onSubmit, onError, form } = this.props;
            form.validateFields((errs, values) => {
                if (!errs) {
                    if (onSubmit) {
                        onSubmit(values);
                    }
                }
                else {
                    onError(errs);
                }
            });
        };
        this.renderField = ({ label, rules, name, initialValue, className, fieldType = 'string', ...ops }) => {
            rules = [...(rules || [])];
            if (fieldType === 'string') {
                rules.unshift(trimRule);
            }
            const { initialValues = {}, form } = this.props;
            return (React.createElement(Form.Item, { label: label, key: name, className: className }, form.getFieldDecorator(name, {
                initialValue: initialValues[name] || initialValue,
                rules,
            })(_renderField(ops))));
        };
        this.renderFields = (fields) => {
            const { type = 'vertical', rowGutter = 20 } = this.props;
            if (type === 'vertical') {
                return fields.map((field) => this.renderField(field));
            }
            else {
                return (React.createElement("div", { className: 'form-horizontal-fields-wrapper' }, fields.map(({ colWidth, ...field }, index) => (React.createElement("div", { style: { padding: `0 ${rowGutter}px`, width: colWidth ? `${colWidth}px` : 'fit-content' }, className: 'form-horizontal-field', key: index }, this.renderField(field))))));
            }
        };
        this.renderForm = (fields, title) => {
            const { titleDividerLine = false, footerDividerLine = false, } = this.props;
            return (React.createElement("div", { className: 'form-wrapper' },
                title && React.createElement("h3", { className: 'form-title' }, title),
                titleDividerLine && React.createElement(Divider, { className: 'form-divier' }),
                React.createElement("div", { className: 'form-fields-wrapper' }, this.renderFields(fields)),
                footerDividerLine && React.createElement(Divider, null)));
        };
        this.renderBtns = () => {
            const { btns = this.defaultBtns } = this.props;
            return (React.createElement("div", { className: 'form-btn-wrapper' }, [...btns, this.cancelBtn].map((btn, index) => {
                const { text, ...otherOps } = btn;
                return (React.createElement(Button, Object.assign({ key: index }, otherOps), text));
            })));
        };
        this.cancelBtn = {
            className: 'form-cancel-btn',
            onClick: this.handleCancel,
            text: props.cancelBtnText || '取消'
        };
        this.defaultBtns = [{
                type: 'primary',
                htmlType: 'submit',
                text: '提交',
                className: 'form-submit-btn'
            }];
    }
    render() {
        const { fields = [], multiple = false, title, components, className } = this.props;
        Object.assign(FILELDS, components);
        return (React.createElement(Form, { className: 'form ' + className, onSubmit: this.handleSubmit },
            multiple && fields.length ?
                fields.map((form) => this.renderForm(form.fields, form.title)) :
                this.renderForm(fields, title),
            this.renderBtns()));
    }
}
export default Form.create({ name: 'DForm' })(DForm);
//# sourceMappingURL=index.js.map