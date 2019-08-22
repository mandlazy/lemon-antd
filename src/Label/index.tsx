import './style.scss';
import React, { ReactElement } from 'react';

interface ILabelProps {
  title: string;
  className?: string;
  children: ReactElement<any>;
}

function Label({ title, className = '', children }: ILabelProps) {
  return (
    <label className={'label ' + className}>
      <p className='label-title'>{title}:</p>
      {children}
    </label>
  );
}

export default Label;
