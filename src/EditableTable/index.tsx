import './style.scss';
import React, { PureComponent } from 'react';
import EditCell from './Cell';
import EditRow from './Row';
import { ITableProps, IColProps } from '../Table';
import Table from '../Table';

export interface IEditTableProps extends ITableProps {
  onChange?: (data: any, error: any, values: any) => void;
  onError?: (error: any) => void;
  onInputChange?: (values: any) => void;
}

class EditableTable extends PureComponent <IEditTableProps> {
  _data: any = [];
  _allData: any = [];
  _errors: any = [];
  handleErrors = (rowIndex: number, errors: any, hasError: boolean) => {
    if (hasError) {
      this._errors[rowIndex] = errors;
    } else {
      this._errors.splice(rowIndex, 1);
    }
  }
  handleValues = (rowIndex: number, values: any, hasError: boolean) => {
    if (hasError) {
      this._data.splice(rowIndex, 1);
    } else {
      this._data[rowIndex] = values;
    }
  }
  handleSave = (ops: any) => {
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
  }
  handleChange = (values: any, rowIndex: number) => {
     const { onInputChange } = this.props;
     this._allData[rowIndex] = values;
     if (onInputChange) {
       onInputChange(this._allData);
     }
  }
  render() {
    const { data = [], columns, components, className = '' , fixedWidth} = this.props;
    this._data = data.concat();
    this._allData = data.concat();
    let { viewing } = this.props;
    const _components = {
      body: {
        row: EditRow,
        cell: EditCell
      }
    };
    const _columns = columns.map((col: IColProps) => {
      if (col.viewing !== undefined) {
        viewing = col.viewing;
      }
      return {
        ...col,
        onCell: (record: any) => {
          const { disabled, ...otherRecord } = record;
          if (record.disabled !== undefined) {
            viewing = record.disabled;
          }
          const { colsOps, ...fieldops } = col;
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
            fieldops
          };
        }
      };
    });
    return (
       <Table
          className={'editable '  + className}
          components={_components}
          fixedWidth={fixedWidth}
          rowClassName={() => 'editable-row'}
          bordered={true}
          pagination={false}
          data={data}
          columns={_columns}
        />
    );
  }
}

export default EditableTable;
