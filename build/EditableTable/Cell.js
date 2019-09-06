import React, { PureComponent } from 'react';
import EditContext from './context';
import { Form } from 'antd';
import { COMMON_FILELDS } from '../data/fields';
const FILELDS = COMMON_FILELDS;
class EditCell extends PureComponent {
    constructor(props) {
        super(props);
        this.form = undefined;
        this.renderField = (ops) => {
            const { type = 'input', dataIndex, rowIndex, ...props } = ops;
            const resType = type;
            return FILELDS[resType]({
                name: dataIndex,
                ['data-row-index']: rowIndex,
                onBlur: () => { this.save(dataIndex, rowIndex); },
                ...props
            });
        };
        this.save = (name, rowIndex) => {
            const { record, handleSave, data } = this.props;
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
                value = viewingValueRender(value);
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
            const { form, rowIndex } = values;
            this.form = form;
            const { dataIndex, record, type, rules, fieldops, render, } = this.props;
            const { validateOps, viewing, useDefinedViewingComponent, viewingValueRender } = fieldops;
            return render ? render(record, rowIndex) : (viewing ?
                this._renderFieldViewing({
                    dataIndex,
                    useDefinedViewingComponent,
                    viewingValueRender,
                    value: record[dataIndex]
                }) :
                React.createElement(Form.Item, { style: { margin: 0 } }, form.getFieldDecorator(dataIndex, {
                    rules,
                    initialValue: record[dataIndex],
                    ...validateOps
                })(this.renderField({ type, ...fieldops, record, rowIndex, form }))));
        };
        Object.assign(FILELDS, props.components);
    }
    render() {
        const { dataIndex, record, index, handleSave, children, components, render, ...restProps } = this.props;
        return (React.createElement("td", Object.assign({}, restProps), React.createElement(EditContext.Consumer, null, this.renderCell)));
    }
}
export default EditCell;
//# sourceMappingURL=Cell.js.map