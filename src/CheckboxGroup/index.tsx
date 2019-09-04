import React, { PureComponent } from 'react';
import { Checkbox } from 'antd';
import { handlerOptions, IOption } from '../utils/Option';

export interface ICheckboxGroupProps {
  options: Array<IOption | string>;
  [propName: string]: any;
}

class CheckboxGroup extends PureComponent<ICheckboxGroupProps> {
  render() {
    const { options = [], textKey = 'text', valueKey = 'value', ...props } = this.props;
    return (
      <Checkbox.Group {...props}>
        { options.map((ops: any) => {
          const { option = {}, optionProps } = handlerOptions(ops, textKey, valueKey);
          return (
            <Checkbox
              className='checkbox'
              key={option[valueKey]}
              value={option[valueKey]}
              {...optionProps}>
              {option[textKey]}
            </Checkbox>
          );
        })}
      </Checkbox.Group>
    );
  }
}

export default CheckboxGroup;
