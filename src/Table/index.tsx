import './style.scss';
import React from 'react';
import { Table as ATable } from 'antd';

export interface ITableProps {
  columns: any[];
  components?: object;
  fixed?: boolean;
  data?: any[];
  pagination?: object | false;
  [propName: string]: any;
}

export interface IColProps {
  width?: number;
  [propName: string]: any;
}

const hasFixedColumn = (columns: any[]): boolean => {
  return columns.find((column: any) => column.fixed !== undefined) ? true : false;
};

function Table(props: ITableProps) {
  const {
    scrollY = 410,
    className,
    pagination = false,
    data,
    columns,
    width,
    components,
    ...otherConfig } = props;
  const scroll: any = {};
  if (pagination) {
    scroll.y = scrollY;
  }
  const tableWidth =  width || columns.reduce((w, col: IColProps) => w + (col.width || 180), 0);
  if (hasFixedColumn(columns)) {
    scroll.x = width;
  }
  return (
    <ATable
      style={{ width: `${tableWidth}px` }}
      components={components}
      columns={columns}
      pagination={pagination}
      className={'table ' + className}
      rowKey={(record: any, index: any) => index}
      dataSource={data}
      scroll={scroll}
      { ...otherConfig } />
  );
}

export default Table;
