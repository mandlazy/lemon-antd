import './style.scss';
import React, { PureComponent } from 'react';
import { Form, Button, Divider } from 'antd';
import { COMMON_FILELDS } from '../data/fields';
import Label from '../Label';
const FILELDS = COMMON_FILELDS;
const _renderField = (ops) => {
    const { type = 'input', useDedefinedViewComponent, ...props } = ops;
    const resType = type;
    return FILELDS[resType]({ ...props });
};
const _renderFieldViewing = (ops) => {
    const { options, label, className = '', name, index, viewingValueRender, components } = ops;
    let { value = '', useDefinedViewingComponent } = ops;
    useDefinedViewingComponent = useDefinedViewingComponent && components[ops.type] ? true : false;
    if (value && useDefinedViewingComponent) {
        value = _renderField({ ...ops, viewing: true, value });
    }
    else if (viewingValueRender) {
        value = viewingValueRender(value);
    }
    else {
        if (value instanceof Array) {
            value = value.join(',');
        }
        if (options && value) {
            const text = options.find((option) => {
                if (typeof option === 'object') {
                    return option.value === value;
                }
                else {
                    return option === value;
                }
            });
            value = typeof text === 'object' ? text.text : text;
        }
    }
    return (React.createElement(Label, { key: name + index, title: label, className: 'form-label-wrapper ' + className },
        React.createElement("div", { className: 'form-label-text' }, value)));
};
const trimRule = {
    transform: (value) => {
        if (typeof value === 'string')
            return value.trim();
        if (typeof value === 'number')
            return value.toString();
    }
};
class DForm extends PureComponent {
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
            const defaultValidateOps = {
                first: false,
                scroll: { offsetTop: 300 }
            };
            const { onSubmit, onError, form, validateWithScroll = true, validateOps = {}, } = this.props;
            const fnName = validateWithScroll ? 'validateFieldsAndScroll' : 'validateFields';
            form[fnName]({ ...defaultValidateOps, ...validateOps }, (errs, values) => {
                if (!errs) {
                    if (onSubmit) {
                        onSubmit(values);
                    }
                }
                else {
                    if (onError) {
                        onError(errs);
                    }
                }
            });
        };
        this.renderField = ({ label, rules, name, initialValue, className, fieldType = 'string', viewingValueRender, useDefinedViewingComponent, filterZero = true, validateOps = {}, ...ops }, index) => {
            rules = [...(rules || [])];
            if (fieldType === 'string') {
                rules.unshift(trimRule);
            }
            const { initialValues = {}, form, components, ...otherProps } = this.props;
            const tempOps = { ...otherProps, ...ops };
            const { viewing, ...usingInEleOps } = ops;
            const fieldValue = (initialValues[name] !== undefined
                && initialValues[name] !== '')
                && (!filterZero || initialValues[name] !== 0) ? initialValues[name] : initialValue;
            return (tempOps.viewing ?
                _renderFieldViewing({
                    ...ops,
                    label,
                    className,
                    name,
                    index,
                    components,
                    viewingValueRender,
                    useDefinedViewingComponent,
                    value: fieldValue
                }) :
                React.createElement(Form.Item, { label: label, key: name + index, className: className }, form.getFieldDecorator(name, {
                    initialValue: fieldValue,
                    rules,
                    ...validateOps
                })(_renderField(usingInEleOps))));
        };
        this.renderFields = (fields) => {
            const { type = 'vertical', rowGutter = 20 } = this.props;
            if (type === 'vertical') {
                return fields.map((field, index) => field ? this.renderField(field, index) : null);
            }
            else {
                return (React.createElement("div", { className: 'form-horizontal-fields-wrapper' }, fields.map((f, index) => {
                    const { colWidth, ...field } = f;
                    return f ? (React.createElement("div", { style: { padding: `0 ${rowGutter}px`, width: colWidth ? `${colWidth}px` : 'fit-content' }, className: 'form-horizontal-field', key: index }, this.renderField(field, index))) : null;
                })));
            }
        };
        this.renderForm = (props) => {
            const { title, fields, className = '' } = props;
            const { titleDividerLine = false, footerDividerLine = false, } = this.props;
            return (React.createElement("div", { className: 'form-wrapper ' + className, key: title },
                title && React.createElement("h3", { className: 'form-title' }, title),
                titleDividerLine && React.createElement(Divider, { className: 'form-divier' }),
                React.createElement("div", { className: 'form-fields-wrapper' }, this.renderFields(fields)),
                footerDividerLine && React.createElement(Divider, null)));
        };
        this.renderBtns = () => {
            const { showCancelBtn } = this.props;
            let { btns = this.defaultBtns } = this.props;
            if (showCancelBtn) {
                btns = [...btns, this.cancelBtn];
            }
            return (React.createElement("div", { className: 'form-btn-wrapper' },
                React.createElement("div", { className: 'form-btn-container' }, btns.map((btn, index) => {
                    const { text, ...otherOps } = btn;
                    return (React.createElement(Button, Object.assign({ key: index }, otherOps), text));
                }))));
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
        const { fields = [], multiple = false, title, components, children, className } = this.props;
        Object.assign(FILELDS, components);
        return (React.createElement(Form, { className: 'form ' + className, onSubmit: this.handleSubmit },
            multiple && fields.length ?
                fields.map((form) => this.renderForm(form)) :
                this.renderForm({ title, fields }),
            this.renderBtns(),
            children));
    }
}
export default Form.create()(DForm);
//# sourceMappingURL=index.js.map