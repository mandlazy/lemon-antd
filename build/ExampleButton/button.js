import './style.scss';
import React from 'react';
import { Button } from 'antd';
const ExampleButton = (props) => {
    return (React.createElement(Button, { className: 'button', type: 'primary' }, props.text));
};
export default ExampleButton;
//# sourceMappingURL=button.js.map