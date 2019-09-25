import EditableContext from './context';
import React from 'react';
import { Form } from 'antd';
const EditableRow = (props) => {
    const { form, ...otherProps } = props;
    return (React.createElement(EditableContext.Provider, { value: { form } },
        React.createElement("tr", Object.assign({}, otherProps))));
};
export default Form.create()(EditableRow);
//# sourceMappingURL=Row.js.map