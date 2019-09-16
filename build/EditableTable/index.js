import './style.scss';
import React, { PureComponent } from 'react';
import EditCell from './Cell';
import EditRow from './Row';
import Table from '../Table';
class EditableTable extends PureComponent {
    constructor() {
        super(...arguments);
        this._data = [];
        this._allData = [];
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
                onChange(this._errors, this._data, this._allData);
            }
            if (onError) {
                onError(this._errors);
            }
        };
        this.handleChange = (values, rowIndex) => {
            const { onInputChange } = this.props;
            this._allData[rowIndex] = values;
            if (onInputChange) {
                onInputChange(this._allData);
            }
        };
    }
    render() {
        const { data = [], columns, components, className = '', fixedWidth } = this.props;
        this._data = data.concat();
        this._allData = data.concat();
        let { viewing } = this.props;
        const _components = {
            body: {
                row: EditRow,
                cell: EditCell
            }
        };
        const _columns = columns.map((col) => {
            if (col.viewing !== undefined) {
                viewing = col.viewing;
            }
            const { colsOps, ...otherCols } = col;
            return {
                ...otherCols,
                ...colsOps,
                onCell: (record) => {
                    const { disabled, ...otherRecord } = record;
                    if (record.disabled !== undefined) {
                        viewing = record.disabled;
                    }
                    return {
                        record: otherRecord,
                        components,
                        dataIndex: col.dataIndex,
                        title: col.title,
                        handleSave: this.handleSave,
                        handleChange: this.handleChange,
                        type: col.type,
                        rules: col.rules,
                        render: col.render,
                        fieldops: otherCols
                    };
                }
            };
        });
        return (React.createElement(Table, { className: 'editable ' + className, components: _components, fixedWidth: fixedWidth, rowClassName: () => 'editable-row', bordered: true, pagination: false, data: data, columns: _columns }));
    }
}
export default EditableTable;
//# sourceMappingURL=index.js.map