import { FunctionComponent } from 'react';
import { Explanation } from '../../../domain/explanation';
interface Props {
    content: HTMLElement;
    senderName: {
        textContent: string;
        explanationPosition: string;
    };
    explanations?: Explanation[];
    explanationNumber?: number;
    showExplanations?: boolean;
}
export declare const FBMessenger: FunctionComponent<Props>;
export default FBMessenger;
