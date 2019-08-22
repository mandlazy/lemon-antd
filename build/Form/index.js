import './style.scss';
import React, { Component } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import Select from '../Select';
import RadioGroup from '../RadioGroup';
import CheckboxGroup from '../CheckboxGroup';
import DateRangePicker from '../DateRangePicker';
const { TextArea } = Input;
const FILELDS = {
    select: (props) => React.createElement(Select, Object.assign({ options: [] }, props)),
    input: (props) => React.createElement(Input, Object.assign({}, props)),
    radios: (props) => React.createElement(RadioGroup, Object.assign({ options: [] }, props)),
    checkboxs: (props) => React.createElement(CheckboxGroup, Object.assign({ options: [] }, props)),
    textarea: (props) => React.createElement(TextArea, Object.assign({}, props)),
    dateRange: (props) => React.createElement(DateRangePicker, Object.assign({}, props)),
};
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
        this.renderField = ({ label, rules = [], name, initialValue, fieldType = 'string', ...ops }) => {
            if (fieldType === 'string') {
                rules.unshift(trimRule);
            }
            const { initialValues = {}, form } = this.props;
            return (React.createElement(Form.Item, { label: label, key: name }, form.getFieldDecorator(name, {
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
        Object.assign(FILELDS, props.components);
    }
    render() {
        const { submitButtonText, cabcelButtonText, fields, dividerLine = false, title } = this.props;
        return (React.createElement(Form, { className: 'form', onSubmit: this.handleSubmit },
            title && React.createElement("h3", null, title),
            dividerLine && React.createElement(Divider, { className: 'form-divier' }),
            React.createElement("div", { className: 'form-fields-wrapper' }, this.renderFields(fields)),
            dividerLine && React.createElement(Divider, null),
            React.createElement("div", { className: 'form-btn-wrapper' },
                React.createElement(Button, { className: 'form-submit-btn', type: 'primary', htmlType: 'submit' }, submitButtonText || '提交'),
                React.createElement(Button, { className: 'form-cancel-btn', onClick: this.handleCancel }, cabcelButtonText || '取消'))));
    }
}
export default Form.create({ name: 'DForm' })(DForm);
//# sourceMappingURL=index.js.map