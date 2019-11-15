import EditableContext from './context';
import React, { PureComponent } from 'react';
import { Form } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

export interface IRowProps {
  form: WrappedFormUtils;
  [propName: string]: any;
}

class EditableRow extends PureComponent<IRowProps> {
  render() {
    const { form, addForm, ...otherProps } = this.props;
    addForm(form, otherProps['data-row-key']);
    return (
      <EditableContext.Provider value={{ form }}>
        <tr {...otherProps} />
      </EditableContext.Provider>
    );
  }
}

export default Form.create<IRowProps>()(EditableRow);
