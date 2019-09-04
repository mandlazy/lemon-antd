import React, { PureComponent } from 'react';
import { Select as AndSelect } from 'antd';
import { handlerOptions, IOption } from '../utils/Option';
export interface ISelectProps {
  options: Array<IOption | string | number>;
  [propName: string]: any;
}

class Select extends PureComponent<ISelectProps> {
  static defaultProps = {
    width: 200
  };
  render() {
    const { options, width, textKey = 'text', valueKey = 'value', ...props } = this.props;
    return (
       <AndSelect style={{ width }} className='select' {...props}>
        { options.map((ops: any) => {
          const { option = {}, optionProps }  = handlerOptions(ops, textKey, valueKey);
          return (
            <AndSelect.Option
              className='select-option'
              key={option[valueKey]}
              value={option[valueKey]}
              {...optionProps}>
              {option[textKey]}
            </AndSelect.Option>
          );
        })}
      </AndSelect>
    );
  }
}

export default Select;
