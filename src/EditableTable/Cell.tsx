import React, { PureComponent } from 'react';
import EditContext from './context';
import { IColProps } from '../Table';
import { Form } from 'antd';
import { COMMON_FILELDS} from '../data/fields';
const FILELDS = COMMON_FILELDS;
class EditCell extends PureComponent<IColProps> {
  form: any = undefined;
  firstRending = true;
  constructor(props: IColProps) {
    super(props);
    Object.assign(FILELDS, props.components);
  }
  change = (value: any, dataIndex: string, rowIndex: number) => {
    const { record } = this.props;
    this.props.handleChange({ ...record, [dataIndex]: value }, rowIndex);
  }
  renderField = (ops: any) => {
    const { type = 'input', dataIndex, rowIndex, onChange, ...props } = ops;
    type fieldType = keyof typeof FILELDS;
    const resType: fieldType = type;
    const change = this.change;
    return FILELDS[resType]({
      name: dataIndex,
      ['data-row-index']: rowIndex,
      onBlur: () => { this.save(dataIndex, rowIndex); },
      onChange(e: any) {
        change(e.target ? e.target.value : e, dataIndex, rowIndex);
        onChange && onChange.apply(this, arguments);
      },
      ...props });
  }
  save = (name: string, rowIndex: number) => {
    const { record, handleSave } = this.props;
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
  _renderFieldViewing = (ops: any) => {
    const {
      options,
      components,
      viewingValueRender } = ops;
    let {
      value = '',
      useDefinedViewingComponent,
       } = ops;
    useDefinedViewingComponent = useDefinedViewingComponent && components[ops.type] ? true : false;
    if (value && useDefinedViewingComponent) {
      value = this.renderField({...ops, viewing: true, value});
    } else if (viewingValueRender) {
      value = viewingValueRender(value, this.props.record);
    } else {
      if (options && value) {
        const text = options.find((option: any) => {
          if (typeof option === 'object') {
            return option.value === value;
          } else {
            return option === value;
          }
        });
        value = typeof text === 'object' ? text.text : text;
      }
      if (value instanceof Array) {
        value = value.join(',');
      }
    }
    return (
       <div className='form-label-wrapper'>{ value }</div>
    );
}
  renderCell = (values: any) => {
    const { form } = values;
    this.form = form;
    const {
      dataIndex,
      record = {},
      type,
      rules,
      fieldops,
      render,
      rowIndex,
    } = this.props;
    const {
      validateOps,
      useDefinedViewingComponent,
      viewingValueRender,
      viewing,
      useDefaultRules = true,
      customizeRules = {},
      ...otherFieldOps } = fieldops;
    const value = record[dataIndex];
    return render ? render(record, rowIndex) : (
      viewing ?
      this._renderFieldViewing({
        dataIndex,
        useDefinedViewingComponent,
        viewingValueRender,
        value}) :
       <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: useDefaultRules ? rules : customizeRules[dataIndex],
          initialValue: value,
          ...validateOps
        })(this.renderField({ type, ...otherFieldOps, record, rowIndex, form}))}
      </Form.Item>
    );
  }
  render() {
    const { className } = this.props;
    return (
      <td className={className}>
        {<EditContext.Consumer>{this.renderCell}</EditContext.Consumer>}
      </td>
    );
  }
}

export default EditCell;
