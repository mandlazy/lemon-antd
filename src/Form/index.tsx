import './style.scss';
import React, { Component, FormEvent } from 'react';
import { Form, Button, Divider } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { COMMON_FILELDS} from '../data/fields';
import { ButtonProps } from 'antd/lib/button';
const FILELDS = COMMON_FILELDS;
export interface IFieldItem {
  label?: string;
  rules?: any[];
  name: string;
  initialValue?: any;
  fieldType?: 'string' | 'object' | 'array' | 'file';
  [ propName: string ]: any;
}

export interface IFormProps {
  fields: Array<IFormProps | IFieldItem>;
  form: WrappedFormUtils;
  multiple?: boolean;
  type?: 'horizontal' | 'vertical';
  components?: JSX.Element[];
  onCancel?: () => {};
  onSubmit?: (t: object) => {};
  initialValues?: any;
  title?: string;
  titleDividerLine?: boolean;
  footerDividerLine?: boolean;
  btns?: IBtnProps[];
  submitButtonText?: string;
  cabcelButtonText?: string;
  [ propName: string ]: any;
}

interface IBtnProps extends ButtonProps {
  text: string;
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

class DForm extends Component<IFormProps & { form: WrappedFormUtils }> {
  defaultBtns: IBtnProps[];
  constructor(props: IFormProps) {
    super(props);
    this.defaultBtns = [{
      type: 'primary',
      htmlType: 'submit',
      text: '提交',
      className: 'form-submit-btn'
    }, {
      className: 'form-cancel-btn',
      onClick: this.handleCancel,
      text: '取消'
    }];
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
    rules,
    name,
    initialValue,
    className,
    fieldType = 'string',
    ...ops
  }: IFieldItem ) => {
    rules = [...(rules || [])];
    if (fieldType === 'string') {
      rules.unshift(trimRule);
    }
    const { initialValues = {}, form } = this.props;
    return (
      <Form.Item label={label} key={name} className={className}>
        { form.getFieldDecorator(name, {
          initialValue: initialValues[name] || initialValue,
          rules,
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
  renderForm = (fields: any[], title?: string) => {
    const { titleDividerLine = false, footerDividerLine = false, } = this.props;
    return (
      <div className='form-wrapper'>
        { title && <h3 className='form-title'>{title}</h3> }
        { titleDividerLine && <Divider className='form-divier' /> }
        <div className='form-fields-wrapper'>
          { this.renderFields(fields) }
        </div>
        { footerDividerLine && <Divider /> }
      </div>
    );
  }
  renderBtns = () => {
    const { btns = this.defaultBtns } = this.props;
    return (
      <div className='form-btn-wrapper'>
        {
          btns.map((btn: IBtnProps, index: number) => {
            const { text, ...otherOps } = btn;
            return (
              <Button key={index} { ...otherOps }>{text}</Button>
            );
          })
        }
      </div>
    );
  }
  render() {
    const {
      fields = [],
      multiple = false,
      title,
      components,
      className} = this.props;
    Object.assign(FILELDS, components);
    return (
      <Form
        className={'form ' + className}
        onSubmit={this.handleSubmit}>
        {
          multiple && fields.length ?
          fields.map((form: any) => this.renderForm(form.fields, form.title)) :
          this.renderForm(fields, title)
        }
        { this.renderBtns() }
      </Form>
    );
  }
}

export default Form.create<IFormProps>({ name: 'DForm' })(DForm);
