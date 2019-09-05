import React, { PureComponent } from 'react';
import { Checkbox } from 'antd';
import { handlerOptions } from '../utils/Option';
class CheckboxGroup extends PureComponent {
    render() {
        const { options = [], textKey = 'text', valueKey = 'value', ...props } = this.props;
        return (React.createElement(Checkbox.Group, Object.assign({}, props), options.map((ops, index) => {
            const { option = {}, optionProps } = handlerOptions(ops, textKey, valueKey);
            return (React.createElement(Checkbox, Object.assign({ className: 'checkbox', key: index, value: option[valueKey] }, optionProps), option[textKey]));
        })));
    }
}
export default CheckboxGroup;
//# sourceMappingURL=index.js.map