import './style.scss';
import React, { Component, FormEvent } from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import Select from '../Select';
import RadioGroup from '../RadioGroup';
import CheckboxGroup from '../CheckboxGroup';
import DateRangePicker from '../DateRangePicker';
const { TextArea } = Input;

const FILELDS = {
  select: (props: object) => <Select options={[]} {...props} />,
  input: (props: object) => <Input {...props} />,
  radios: (props: object) => <RadioGroup options={[]} {...props} />,
  checkboxs: (props: object) => <CheckboxGroup options={[]} {...props} />,
  textarea: (props: object) => <TextArea {...props} />,
  dateRange: (props: object) => <DateRangePicker {...props}/>,
};

export interface IFieldItem {
  label?: string;
  rules?: any[];
  name: string;
  initialValue?: any;
  fieldType?: 'string' | 'object' | 'array' | 'file';
  [ propName: string ]: any;
}

export interface IFormProps {
  fields: IFieldItem [];
  form: WrappedFormUtils;
  type?: 'horizontal' | 'vertical';
  components?: JSX.Element[];
  onCancel?: () => {};
  onSubmit?: (t: object) => {};
  initialValues?: any;
  title?: string;
  dividerLine?: boolean;
  btns?: JSX.Element[];
  submitButtonText?: string;
  cabcelButtonText?: string;
  [ propName: string ]: any;
}
const renderField = (ops: any) => {
  const { type = 'input', ...props } = ops;
  type fieldType = keyof typeof FILELDS;
  const resType: fieldType = type;
  return FILELDS[resType]({ ...props });
};

const trimRule = {
  transform: (value: (string | number)) => {
    if (typeof value === 'string') return value.trim();
    if (typeof value === 'number') return value.toString();
  }
};

class DForm extends Component<IFormProps & { form: WrappedFormUtils,  }> {
  constructor(props: IFormProps) {
    super(props);
    Object.assign(FILELDS, props.components);
  }
  handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  }
  handleSubmit = (e: FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    const { onSubmit, form } = this.props;
    form.validateFields((errs: any, values: object) => {
      if (!errs) {
        if (onSubmit) {
          onSubmit(values);
        }
      }
    });
  }
  renderField = ({
    label,
    rules = [],
    name,
    initialValue,
    fieldType = 'string',
    ...ops
  }: IFieldItem ) => {
    if (fieldType === 'string') {
      rules.unshift(trimRule);
    }
    const { initialValues = {}, form } = this.props;
    return (
      <Form.Item label={label} key={name}>
        { form.getFieldDecorator(name, {
          initialValue: initialValues[name] || initialValue,
          rules: [...rules]
        })(renderField(ops))}
      </Form.Item>
    );
  }
  renderFields = (fields: any[]) => {
    const { type = 'vertical', rowGutter = 20 } = this.props;
    if (type === 'vertical') {
      return fields.map((field) => this.renderField(field));
    } else {
      return (
        <div
          className='form-horizontal-fields-wrapper'>
          {
            fields.map(({ colWidth, ...field}, index) => (
              <div
                style={{ padding: `0 ${rowGutter}px`, width: colWidth ? `${colWidth}px` : 'fit-content' }}
                className='form-horizontal-field'
                key={index}>
                { this.renderField(field) }
              </div>
            ))
          }
       </div>
      );
    }
  }
  render() {
    const {
      submitButtonText,
      cabcelButtonText,
      fields,
      dividerLine = false,
      title } = this.props;
    return (
      <Form className='form' onSubmit={this.handleSubmit}>
        { title && <h3>{title}</h3> }
        { dividerLine && <Divider className='form-divier' /> }
        <div className='form-fields-wrapper'>
          { this.renderFields(fields) }
        </div>
        { dividerLine && <Divider /> }
        <div className='form-btn-wrapper'>
          <Button className='form-submit-btn' type='primary' htmlType='submit'>
            { submitButtonText || '提交' }
          </Button>
          <Button className='form-cancel-btn' onClick={this.handleCancel}>
            { cabcelButtonText || '取消' }
          </Button>
        </div>
      </Form>
    );
  }
}

export default Form.create<IFormProps>({ name: 'DForm' })(DForm);
