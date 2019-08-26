import './style.scss';
import React, { MouseEventHandler } from 'react';
import PropTypes from 'prop-types';

export interface IOverlayerProps {
  onClick?: MouseEventHandler;
  bgColor?: string;
  zIndex?: number;
  hide?: boolean;
  children?: JSX.Element;
}

function Overlayer(props: IOverlayerProps) {
  const { onClick, bgColor, zIndex, hide, children } = props;
  if (hide) return null;
  const style = {
    zIndex,
    backgroundColor: bgColor
  };
  return (
    <div className='overlayer' onClick={onClick} style={style}>
      {children}
    </div>
  );
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
