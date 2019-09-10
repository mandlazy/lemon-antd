import EditableContext from './context';
import React from 'react';
import { Form } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

export interface IRowProps {
  form: WrappedFormUtils;
  [propName: string]: any;
}

const EditableRow = (props: IRowProps) => {
  const { form, ...otherProps } = props;
  const rowIndex = otherProps['data-row-key'];
  return (
    <EditableContext.Provider value={{ form, rowIndex }}>
      <tr {...otherProps} />
    </EditableContext.Provider>
  );
};

export default Form.create<IRowProps>()(EditableRow);
