import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';
function Overlayer(props) {
    const { onClick, bgColor, zIndex, hide, children } = props;
    if (hide)
        return null;
    const style = {
        zIndex,
        backgroundColor: bgColor
    };
    return (React.createElement("div", { className: 'overlayer', onClick: onClick, style: style }, children));
}
Overlayer.propTypes = {
    bgColor: PropTypes.string,
    zIndex: PropTypes.number,
    onClick: PropTypes.func,
    hide: PropTypes.bool
};
Overlayer.defaultProps = {
    bgColor: 'rgba(0,0,0,0.2)',
    zIndex: 5
};
export default Overlayer;
//# sourceMappingURL=index.js.map