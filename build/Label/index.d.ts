import './style.scss';
import { ReactElement } from 'react';
interface ILabelProps {
    title: string;
    className?: string;
    children: ReactElement<any>;
}
declare function Label({ title, className, children }: ILabelProps): JSX.Element;
export default Label;
