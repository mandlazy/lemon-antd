import EditableContext from './context';
import React from 'react';
import { Form } from 'antd';
const EditableRow = (props) => {
    const { form, ...otherProps } = props;
    form.resetFields();
    const rowIndex = otherProps['data-row-key'];
    return (React.createElement(EditableContext.Provider, { value: { form, rowIndex } },
        React.createElement("tr", Object.assign({}, otherProps))));
};
export default Form.create()(EditableRow);
//# sourceMappingURL=Row.js.map