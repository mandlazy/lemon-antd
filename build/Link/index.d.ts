/// <reference types="react" />
export interface ILinkProps {
    to: string;
    children: any;
    [propName: string]: any;
}
declare const Link: ({ children, to }: ILinkProps) => JSX.Element;
export default Link;
