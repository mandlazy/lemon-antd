import React, { PureComponent } from 'react';
import EditContext from './context';
import { Form } from 'antd';
import { COMMON_FILELDS } from '../data/fields';
const FILELDS = COMMON_FILELDS;
class EditCell extends PureComponent {
    constructor(props) {
        super(props);
        this.form = undefined;
        this.firstRending = true;
        this.change = (value, dataIndex, rowIndex) => {
            const { record } = this.props;
            this.props.handleChange({ ...record, [dataIndex]: value }, rowIndex);
        };
        this.renderField = (ops) => {
            const { type = 'input', dataIndex, rowIndex, onChange, ...props } = ops;
            const resType = type;
            const change = this.change;
            return FILELDS[resType]({
                name: dataIndex,
                ['data-row-index']: rowIndex,
                onBlur: () => { this.save(dataIndex, rowIndex); },
                onChange(e) {
                    change(e.target ? e.target.value : e, dataIndex, rowIndex);
                    onChange && onChange.apply(this, arguments);
                },
                ...props
            });
        };
        this.save = (name, rowIndex) => {
            const { record, handleSave } = this.props;
            const { getFieldsError, validateFields } = this.form;
            validateFields([name], (error, values) => {
                const errors = {};
                Object.entries(getFieldsError()).map(([key, value]) => {
                    if (value) {
                        errors[key] = value;
                    }
                });
                handleSave({
                    errors: Object.keys(errors).length ? errors : null,
                    values: { ...record, ...values },
                    rowIndex,
                    name
                });
            });
        };
        this._renderFieldViewing = (ops) => {
            const { options, components, viewingValueRender } = ops;
            let { value = '', useDefinedViewingComponent, } = ops;
            useDefinedViewingComponent = useDefinedViewingComponent && components[ops.type] ? true : false;
            if (value && useDefinedViewingComponent) {
                value = this.renderField({ ...ops, viewing: true, value });
            }
            else if (viewingValueRender) {
                value = viewingValueRender(value, this.props.record);
            }
            else {
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
                if (value instanceof Array) {
                    value = value.join(',');
                }
            }
            return (React.createElement("div", { className: 'form-label-wrapper' }, value));
        };
        this.renderCell = (values) => {
            const { form } = values;
            this.form = form;
            const { dataIndex, record = {}, type, fieldops, render, rowIndex, } = this.props;
            let { rules } = this.props;
            const { validateOps, validateWithRecord = false, useDefinedViewingComponent, viewingValueRender, viewing, useDefaultRules = true, customizeRules = {}, ...otherFieldOps } = fieldops;
            const value = record[dataIndex];
            if (validateWithRecord && rules) {
                rules = rules.slice(0);
                const validatorRuleIndex = rules.findIndex((rule) => rule.validator !== undefined);
                const validatorFn = rules[validatorRuleIndex].validator;
                rules[validatorRuleIndex] = {
                    validator: (rule, curValue, cb, source, ops) => {
                        validatorFn(rule, curValue, cb, source, ops, record);
                    }
                };
            }
            return render ? render(record, rowIndex) : (viewing ?
                this._renderFieldViewing({
                    dataIndex,
                    useDefinedViewingComponent,
                    viewingValueRender,
                    value
                }) :
                React.createElement(Form.Item, { style: { margin: 0 } }, form.getFieldDecorator(dataIndex, {
                    rules: useDefaultRules ? rules : customizeRules[dataIndex],
                    initialValue: value,
                    ...validateOps
                })(this.renderField({ type, ...otherFieldOps, record, rowIndex, form }))));
        };
        Object.assign(FILELDS, props.components);
    }
    render() {
        const { className } = this.props;
        return (React.createElement("td", { className: className }, React.createElement(EditContext.Consumer, null, this.renderCell)));
    }
}
export default EditCell;
//# sourceMappingURL=Cell.js.map