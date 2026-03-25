import { FunctionComponent } from 'react';
import { Explanation } from '../../../domain/explanation';
export interface OutlookCustomElements {
    textContent: string;
    explanationPosition: string | null;
}
export interface OutlookAttachmentElement {
    name: string;
    position: string;
    explanationPosition?: string | null;
    fileType?: string;
}
interface Props {
    content: HTMLElement;
    senderName: OutlookCustomElements;
    senderEmail: OutlookCustomElements;
    receiverName?: string;
    receiverEmail?: string;
    subject?: OutlookCustomElements;
    attachments?: any[];
    explanations?: Explanation[];
    explanationNumber?: number;
    showExplanations?: boolean;
}
export declare const Outlook: FunctionComponent<Props>;
export {};
