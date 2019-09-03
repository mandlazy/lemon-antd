import React, { PureComponent } from 'react';
import { Checkbox } from 'antd';
import { handlerOptions } from '../utils/Option';
class CheckboxGroup extends PureComponent {
    render() {
        const { options = [], ...props } = this.props;
        return (React.createElement(Checkbox.Group, Object.assign({}, props), options.map((ops) => {
            const { text, value, ...otherProps } = handlerOptions(ops);
            return (React.createElement(Checkbox, Object.assign({ className: 'checkbox', key: value, value: value }, otherProps), text));
        })));
    }
}
export default CheckboxGroup;
//# sourceMappingURL=index.js.map