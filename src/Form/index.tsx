import './style.scss';
import React, { PureComponent, FormEvent } from 'react';
import { Form, Button, Divider } from 'antd';
import { WrappedFormUtils, FormComponentProps } from 'antd/lib/form/Form';
import { COMMON_FILELDS} from '../data/fields';
import { ButtonProps } from 'antd/lib/button';
import Label from '../Label';
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
  components?: any;
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

const _renderField = (ops: any) => {
  const { type = 'input', useDedefinedViewComponent, ...props } = ops;
  type fieldType = keyof typeof FILELDS;
  const resType: fieldType = type;
  return FILELDS[resType]({ ...props });
};

const _renderFieldViewing = (ops: any) => {
    const {
      options,
      label,
      className = '',
      name,
      index,
      components } = ops;
    let {
      value = '',
      useDefinedViewingComponent } = ops;
    useDefinedViewingComponent = useDefinedViewingComponent && components[ops.type] ? true : false;
    if (value && useDefinedViewingComponent) {
      value = _renderField({...ops, viewing: true, value});
    } else {
      if (value instanceof Array) {
        value = value.join(',');
      }
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
    }
    return (
      <Label
        key={name + index}
        title={label}
        className={'form-label-wrapper ' + className}>
        <div className='form-label-text'>{ value }</div>
      </Label>
    );
};

const trimRule = {
  transform: (value: (string | number)) => {
    if (typeof value === 'string') return value.trim();
    if (typeof value === 'number') return value.toString();
  }
};

class DForm extends PureComponent<IFormProps & FormComponentProps> {
  defaultBtns: IBtnProps[];
  cancelBtn: IBtnProps;
  constructor(props: IFormProps) {
    super(props);
    this.cancelBtn = {
      className: 'form-cancel-btn',
      onClick: this.handleCancel,
      text: props.cancelBtnText || '取消'
    };
    this.defaultBtns = [{
      type: 'primary',
      htmlType: 'submit',
      text: '提交',
      className: 'form-submit-btn'
    }];
  }
  handleCancel = () => {
    const { onCancel, form } = this.props;
    form.resetFields();
    if (onCancel) {
      onCancel();
    }
  }
  handleSubmit = (e: FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    const { onSubmit, onError, form } = this.props;
    form.validateFields((errs: any, values: object) => {
      if (!errs) {
        if (onSubmit) {
          onSubmit(values);
        }
      } else {
        if (onError) {
          onError(errs);
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
    useDefinedViewingComponent,
    validateOps = {},
    ...ops
  }: IFieldItem, index: number ) => {
    rules = [...(rules || [])];
    if (fieldType === 'string') {
      rules.unshift(trimRule);
    }
    const { initialValues = {}, form, viewing, components } = this.props;
    return (
      viewing ?
      _renderFieldViewing({
        ...ops,
        label,
        className,
        name,
        index,
        components,
        useDefinedViewingComponent,
        value: initialValues[name] || ops.value }) :
      <Form.Item label={label} key={name + index} className={className}>
        { form.getFieldDecorator(name, {
          initialValue: initialValues[name] || initialValue,
          rules,
          ...validateOps
        })(_renderField(ops))}
      </Form.Item>
    );
  }
  renderFields = (fields: any[]) => {
    const { type = 'vertical', rowGutter = 20 } = this.props;
    if (type === 'vertical') {
      return fields.map((field, index) => field ? this.renderField(field, index) : null);
    } else {
      return (
        <div
          className='form-horizontal-fields-wrapper'>
          {
            fields.map((f, index) => {
              const { colWidth, ...field} = f;
              return f ? (
                <div
                  style={{ padding: `0 ${rowGutter}px`, width: colWidth ? `${colWidth}px` : 'fit-content' }}
                  className='form-horizontal-field'
                  key={index}>
                  { this.renderField(field, index) }
                </div>
              ) : null;
            })
          }
       </div>
      );
    }
  }
  renderForm = (props: any) => {
    const { title, fields, className = '' } = props;
    const { titleDividerLine = false, footerDividerLine = false, } = this.props;
    return (
      <div className={ 'form-wrapper ' + className } key={title}>
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
    const { showCancelBtn } = this.props;
    let { btns = this.defaultBtns } = this.props;
    if (showCancelBtn) {
      btns = [...btns, this.cancelBtn];
    }
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
      children,
      className} = this.props;
    Object.assign(FILELDS, components);
    return (
      <Form
        className={'form ' + className}
        onSubmit={this.handleSubmit}>
        {
          multiple && fields.length ?
          fields.map((form: any) => this.renderForm(form)) :
          this.renderForm({ title, fields  })
        }
        { this.renderBtns() }
        { children }
      </Form>
    );
  }
}

export default Form.create<IFormProps>()(DForm);
