import React from 'react';

export interface ILinkProps {
  to: string;
  children: any;
  [propName: string]: any;
};
const Link = ({children, to}: ILinkProps) => <a href={to}> {children} </a>

export default Link;