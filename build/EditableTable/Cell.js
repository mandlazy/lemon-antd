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
                ['row-index']: rowIndex,
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
        this.renderCell = (value) => {
            const { form, rowIndex } = value;
            this.form = form;
            const { dataIndex, record, type, rules, fieldops, render } = this.props;
            return render ? render(record, rowIndex) : (React.createElement(Form.Item, { style: { margin: 0 } }, form.getFieldDecorator(dataIndex, {
                rules,
                initialValue: record[dataIndex]
            })(this.renderField({ type, ...fieldops, record, rowIndex }))));
        };
        Object.assign(FILELDS, props.components);
    }
    render() {
        const { dataIndex, record, index, handleSave, children, components, ...restProps } = this.props;
        return (React.createElement("td", Object.assign({}, restProps), React.createElement(EditContext.Consumer, null, this.renderCell)));
    }
}
export default EditCell;
//# sourceMappingURL=Cell.js.map