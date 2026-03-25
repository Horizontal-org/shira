import { FunctionComponent, ReactNode } from 'react';
interface FlowHeaderProps {
    actions: ReactNode;
    onExit: () => void;
    title: string;
}
export declare const FlowHeader: FunctionComponent<FlowHeaderProps>;
export {};
