import './style.scss';
import React from 'react';
import { Table as ATable } from 'antd';
const hasFixedColumn = (columns) => {
    return columns.find((column) => column.fixed !== undefined) ? true : false;
};
function Table(props) {
    const { scrollY = 410, className, pagination = false, data, columns, width, components, ...otherConfig } = props;
    const scroll = {};
    const { fixedWidth = false } = props;
    if (pagination) {
        scroll.y = scrollY;
    }
    let style = {};
    const tableWidth = width || columns.reduce((w, col) => w + (col.width || 180), 0);
    if (hasFixedColumn(columns)) {
        scroll.x = tableWidth;
    }
    if (fixedWidth) {
        style = { width: `${tableWidth}px` };
    }
    return (React.createElement(ATable, Object.assign({ style: style, components: components, columns: columns, pagination: pagination, className: 'table ' + className, rowKey: (record, index) => index, dataSource: data, scroll: scroll }, otherConfig)));
}
export default Table;
//# sourceMappingURL=index.js.map