import './style.scss';
import React from 'react';
function NoMatch() {
    return (React.createElement("div", { className: 'nomatch' },
        React.createElement("div", { className: 'nomatch-body' },
            React.createElement("p", { className: 'nomatch-body-404' }, "404 not found"),
            React.createElement("p", { className: 'nomatch-body-tip' }, "\u9875\u9762url\u6709\u8BEF\uFF0C\u8BF7\u786E\u8BA4\uFF01"))));
}
export default NoMatch;
//# sourceMappingURL=index.js.map