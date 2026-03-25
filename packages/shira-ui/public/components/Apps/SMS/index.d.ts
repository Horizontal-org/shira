import { FunctionComponent } from 'react';
import { Explanation } from '../../../domain/explanation';
interface Props {
    phone: {
        textContent: string;
        explanationPosition: string;
    };
    content: HTMLElement;
    explanations?: Explanation[];
    explanationNumber?: number;
    showExplanations?: boolean;
}
export declare const SMS: FunctionComponent<Props>;
export {};
