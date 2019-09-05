import React, { PureComponent } from 'react';
import { Radio } from 'antd';
import { handlerOptions, IOption } from '../utils/Option';

export interface IRadioGroupProps {
  options: Array<IOption | string>;
  [propName: string]: any;
}

class RadioGroup extends PureComponent<IRadioGroupProps> {
  render() {
    const { options, textKey = 'text', valueKey = 'value', ...props } = this.props;
    return (
      <Radio.Group {...props}>
        { options.map((ops: any, index) => {
          const { option = {}, optionProps } = handlerOptions(ops, textKey, valueKey);
          return (
            <Radio
            key={index}
            className='radio'
            value={option[valueKey]}
            {...optionProps}>
              {option[textKey]}
            </Radio>
          );
        })}
      </Radio.Group>
    );
  }
}

export default RadioGroup;
