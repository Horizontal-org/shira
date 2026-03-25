import { FunctionComponent, ReactNode } from 'react';
export interface EmptyStateProps {
    subtitle: string;
    buttons?: ReactNode | ReactNode[];
    backgroundColor?: string;
}
export declare const EmptyState: FunctionComponent<EmptyStateProps>;
