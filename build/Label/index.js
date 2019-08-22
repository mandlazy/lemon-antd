import './style.scss';
import React from 'react';
function Label({ title, className = '', children }) {
    return (React.createElement("label", { className: 'label ' + className },
        React.createElement("p", { className: 'label-title' },
            title,
            ":"),
        children));
}
export default Label;
//# sourceMappingURL=index.js.map