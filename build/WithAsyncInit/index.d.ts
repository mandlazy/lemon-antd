import React, { ComponentType } from 'react';
export interface IAsyncInitProps {
    onAsyncInit: () => any;
    [propName: string]: any;
}
declare function withAsyncInit(WrapComponet: ComponentType<any>, ops?: any): {
    new (props: any): {
        componentDidMount(): void;
        onAsyncInit: () => Promise<void>;
        render(): JSX.Element;
        context: any;
        setState<K extends string | number | symbol>(state: any, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<IAsyncInitProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<any>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    defaultProps: {
        [x: number]: never[];
    };
    contextType?: React.Context<any> | undefined;
};
export default withAsyncInit;
