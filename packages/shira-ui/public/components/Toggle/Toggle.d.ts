import { FunctionComponent } from 'react';
export interface ToggleProps {
    isEnabled: boolean;
    onToggle: () => void;
    rightLabel?: string;
    leftLabel?: string;
    className?: string;
    disabled?: boolean;
    size?: 'medium' | 'big';
}
export declare const Toggle: FunctionComponent<ToggleProps>;
export default Toggle;
