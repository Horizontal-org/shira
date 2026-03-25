import { FunctionComponent } from 'react';
import { Explanation } from '../../../domain/explanation';
interface Props {
    content?: HTMLElement;
    phone: {
        textContent: string;
        explanationPosition: string;
    };
    explanations?: Explanation[];
    explanationNumber?: number;
    showExplanations?: boolean;
}
export declare const Whatsapp: FunctionComponent<Props>;
export default Whatsapp;
