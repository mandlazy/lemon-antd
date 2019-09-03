import React, { PureComponent } from 'react';
import { Checkbox } from 'antd';
import { handlerOptions, IOption } from '../utils/Option';

export interface ICheckboxGroupProps {
  options: Array<IOption | string>;
  [propName: string]: any;
}

class CheckboxGroup extends PureComponent<ICheckboxGroupProps> {
  render() {
    const { options = [], ...props } = this.props;
    return (
      <Checkbox.Group {...props}>
        {options.map((ops) => {
          const { text, value, ...otherProps } = handlerOptions(ops);
          return (
            <Checkbox
              className='checkbox'
              key={value}
              value={value}
              {...otherProps}>
              {text}
            </Checkbox>
          );
        })}
      </Checkbox.Group>
    );
  }
}

export default CheckboxGroup;
