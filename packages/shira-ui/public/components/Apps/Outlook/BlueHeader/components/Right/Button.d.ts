import { FunctionComponent, ReactNode } from 'react';
interface Props {
    children: ReactNode;
    hide: 'first' | 'second' | 'never' | 'desktop';
}
export declare const Button: FunctionComponent<Props>;
export {};
