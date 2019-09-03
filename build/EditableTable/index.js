import './style.scss';
import React, { PureComponent } from 'react';
import EditCell from './Cell';
import EditRow from './Row';
import Table from '../Table';
class EditableTable extends PureComponent {
    constructor(props) {
        super(props);
        this._data = [];
        this._errors = [];
        this.handleErrors = (rowIndex, errors, hasError) => {
            if (hasError) {
                this._errors[rowIndex] = errors;
            }
            else {
                this._errors.splice(rowIndex, 1);
            }
        };
        this.handleValues = (rowIndex, values, hasError) => {
            if (hasError) {
                this._data.splice(rowIndex, 1);
            }
            else {
                this._data[rowIndex] = values;
            }
        };
        this.handleSave = (ops) => {
            const { errors, values, rowIndex } = ops;
            const { onChange, onError } = this.props;
            const hasError = errors ? true : false;
            this.handleValues(rowIndex, values, hasError);
            this.handleErrors(rowIndex, errors, hasError);
            if (onChange) {
                onChange(this._data);
            }
            if (onError) {
                onError(this._errors);
            }
        };
        this._data = props.data;
    }
    render() {
        const { data, columns, components, className = '' } = this.props;
        const _components = {
            body: {
                row: EditRow,
                cell: EditCell
            }
        };
        const _columns = columns.map((col) => {
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    components,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                    type: col.type,
                    rules: col.rules,
                    render: col.render,
                    fieldops: { ...col }
                })
            };
        });
        return (React.createElement(Table, { className: 'editable ' + className, components: _components, rowClassName: () => 'editable-row', bordered: true, pagination: false, data: data, columns: _columns }));
    }
}
export default EditableTable;
//# sourceMappingURL=index.js.map