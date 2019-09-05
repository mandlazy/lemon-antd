import React, { PureComponent } from 'react';
import { Radio } from 'antd';
import { handlerOptions } from '../utils/Option';
class RadioGroup extends PureComponent {
    render() {
        const { options, textKey = 'text', valueKey = 'value', ...props } = this.props;
        return (React.createElement(Radio.Group, Object.assign({}, props), options.map((ops, index) => {
            const { option = {}, optionProps } = handlerOptions(ops, textKey, valueKey);
            return (React.createElement(Radio, Object.assign({ key: index, className: 'radio', value: option[valueKey] }, optionProps), option[textKey]));
        })));
    }
}
export default RadioGroup;
//# sourceMappingURL=index.js.map