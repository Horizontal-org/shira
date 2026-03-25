import { FunctionComponent, ReactNode } from 'react';
interface Props {
    text: string;
    icon: ReactNode;
    amount?: number;
    selected?: boolean;
    type?: string;
}
export declare const Item: FunctionComponent<Props>;
export {};
