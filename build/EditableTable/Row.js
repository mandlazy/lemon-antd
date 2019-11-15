import EditableContext from './context';
import React, { PureComponent } from 'react';
import { Form } from 'antd';
class EditableRow extends PureComponent {
    render() {
        const { form, addForm, ...otherProps } = this.props;
        addForm(form, otherProps['data-row-key']);
        return (React.createElement(EditableContext.Provider, { value: { form } },
            React.createElement("tr", Object.assign({}, otherProps))));
    }
}
export default Form.create()(EditableRow);
//# sourceMappingURL=Row.js.map