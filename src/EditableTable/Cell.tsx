import React, { PureComponent } from 'react';
import EditContext from './context';
import { IColProps } from '../Table';
import { Form } from 'antd';
import { COMMON_FILELDS} from '../data/fields';
const FILELDS = COMMON_FILELDS;

class EditCell extends PureComponent<IColProps> {
  form: any = undefined;
  constructor(props: IColProps) {
    super(props);
    Object.assign(FILELDS, props.components);
  }
  renderField = (ops: any) => {
    const { type = 'input', dataIndex, rowIndex, ...props } = ops;
    type fieldType = keyof typeof FILELDS;
    const resType: fieldType = type;
    return FILELDS[resType]({
      name: dataIndex,
      ['row-index']: rowIndex,
      onBlur: () => { this.save(dataIndex, rowIndex); },
      ...props });
  }
  save = (name: string, rowIndex: number) => {
    const { record, handleSave, data } = this.props;
    const { getFieldsError, validateFields } = this.form;
    validateFields([ name ], (error: any, values: any) => {
      const errors: any = {};
      Object.entries(getFieldsError()).map(([key, value]: any) => {
        if (value) {
          errors[key] = value;
        }
      });
      handleSave({
        errors: Object.keys(errors).length ? errors : null,
        values: { ...record, ...values },
        rowIndex,
        name
      });
    });
  }
  renderCell = (value: any) => {
    const { form, rowIndex } = value;
    this.form = form;
    const {
      dataIndex,
      record,
      type,
      rules,
      fieldops,
      render
    } = this.props;
    return render ? render(record, rowIndex) : (
       <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules,
          initialValue: record[dataIndex]
        })(this.renderField({ type, ...fieldops, record, rowIndex }))}
      </Form.Item>
    );
  }
  render() {
    const {
      dataIndex,
      record,
      index,
      handleSave,
      children,
      components,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {<EditContext.Consumer>{this.renderCell}</EditContext.Consumer>}
      </td>
    );
  }
}

export default EditCell;
