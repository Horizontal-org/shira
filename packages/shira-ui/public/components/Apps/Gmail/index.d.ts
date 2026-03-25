import { FunctionComponent } from 'react';
import { Explanation } from '../../../domain/explanation';
interface CustomElements {
    textContent: string;
    explanationPosition: string | null;
}
export interface AttachmentElement {
    name: string;
    position: string;
    explanationPosition?: string | null;
    fileType?: string;
}
interface Props {
    content: HTMLElement;
    senderName: CustomElements;
    senderEmail: CustomElements;
    receiverName?: string;
    receiverEmail?: string;
    subject?: CustomElements;
    attachments?: AttachmentElement[];
    explanations?: Explanation[];
    explanationNumber?: number;
    showExplanations?: boolean;
}
export declare const Gmail: FunctionComponent<Props>;
export default Gmail;
