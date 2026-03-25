import { FunctionComponent } from 'react';
interface Props {
    onResend?: () => void;
    onDelete?: () => void;
    showResend?: boolean;
    showDelete?: boolean;
}
export declare const TableActions: FunctionComponent<Props>;
export {};
