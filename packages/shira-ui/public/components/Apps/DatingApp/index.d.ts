import { FunctionComponent } from 'react';
import { Explanation } from '../../../domain/explanation';
interface Props {
    senderName: {
        textContent: string;
        explanationPosition: string;
    };
    content: HTMLElement;
    explanations?: Explanation[];
    explanationNumber?: number;
    showExplanations?: boolean;
}
export declare const DatingApp: FunctionComponent<Props>;
export default DatingApp;
