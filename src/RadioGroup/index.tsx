import React, { PureComponent } from 'react';
import { Radio } from 'antd';
import { handlerOptions, IOption } from '../utils/Option';

export interface IRadioGroupProps {
  options: Array<IOption | string>;
  [propName: string]: any;
}

class RadioGroup extends PureComponent<IRadioGroupProps> {
  render() {
    const { options, ...props } = this.props;
    return (
      <Radio.Group {...props}>
        {options.map((ops) => {
          const { text, value } = handlerOptions(ops);
          return (
            <Radio key={value} className='radio' value={value}>
              {text}
            </Radio>
          );
        })}
      </Radio.Group>
    );
  }
}

export default RadioGroup;
