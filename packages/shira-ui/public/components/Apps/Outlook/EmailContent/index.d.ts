import { FunctionComponent } from 'react';
import { OutlookAttachmentElement, OutlookCustomElements } from '..';
interface Props {
    content: HTMLElement;
    senderName: OutlookCustomElements;
    senderEmail: OutlookCustomElements;
    attachments: OutlookAttachmentElement[];
}
export declare const EmailContent: FunctionComponent<Props>;
export {};
