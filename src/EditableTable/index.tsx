import './style.scss';
import React, { PureComponent } from 'react';
import EditCell from './Cell';
import EditRow from './Row';
import { ITableProps, IColProps } from '../Table';
import Table from '../Table';

export interface IEditTableProps extends ITableProps {
  onChange?: (data: any) => void;
  onError?: (error: any) => void;
}

class EditableTable extends PureComponent <IEditTableProps> {
  _data: any = [];
  _errors: any = [];
  constructor(props: IEditTableProps) {
    super(props);
    this._data = props.data;
  }
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
      onChange(this._data);
    }
    if (onError) {
      onError(this._errors);
    }
  }
  render() {
    const { data, columns, components, className = '' , fixedWidth} = this.props;
    const _components = {
      body: {
        row: EditRow,
        cell: EditCell
      }
    };
    const _columns = columns.map((col: IColProps) => {
      return {
        ...col,
        onCell: (record: any) => ({
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
