/// <reference types="react" />
import './style.scss';
interface IPageLoadingProps {
    hide?: boolean;
    tip?: string;
    bgColor?: string;
}
declare function PageLoading(props: IPageLoadingProps): JSX.Element;
export default PageLoading;
