import './style.scss';
import React, { Component } from 'react';
import { Form, Button, Divider } from 'antd';
import { COMMON_FILELDS } from '../data/fields';
const FILELDS = COMMON_FILELDS;
const renderField = (ops) => {
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
            const { onCancel } = this.props;
            if (onCancel) {
                onCancel();
            }
        };
        this.handleSubmit = (e) => {
            if (e) {
                e.preventDefault();
            }
            const { onSubmit, form } = this.props;
            form.validateFields((errs, values) => {
                if (!errs) {
                    if (onSubmit) {
                        onSubmit(values);
                    }
                }
            });
        };
        this.renderField = ({ label, rules = [], name, initialValue, className, fieldType = 'string', ...ops }) => {
            if (fieldType === 'string') {
                rules.unshift(trimRule);
            }
            const { initialValues = {}, form } = this.props;
            return (React.createElement(Form.Item, { label: label, key: name, className: className }, form.getFieldDecorator(name, {
                initialValue: initialValues[name] || initialValue,
                rules: [...rules]
            })(renderField(ops))));
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
        Object.assign(FILELDS, props.components);
    }
    render() {
        const { submitButtonText, cabcelButtonText, fields = [], forms = [], title } = this.props;
        return (React.createElement(Form, { className: 'form', onSubmit: this.handleSubmit },
            forms && forms.length ?
                forms.map((form) => this.renderForm(form.fields, form.title)) :
                this.renderForm(fields, title),
            React.createElement("div", { className: 'form-btn-wrapper' },
                React.createElement(Button, { className: 'form-submit-btn', type: 'primary', htmlType: 'submit' }, submitButtonText || '提交'),
                React.createElement(Button, { className: 'form-cancel-btn', onClick: this.handleCancel }, cabcelButtonText || '取消'))));
    }
}
export default Form.create({ name: 'DForm' })(DForm);
//# sourceMappingURL=index.js.map