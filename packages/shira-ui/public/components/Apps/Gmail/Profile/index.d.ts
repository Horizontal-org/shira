import { FunctionComponent } from 'react';
interface CustomElements {
    textContent: string;
    explanationPosition: string | null;
}
interface Props {
    senderName: CustomElements;
    senderEmail: CustomElements;
    receiverName?: string;
    receiverEmail?: string;
    subject: string;
}
export declare const Profile: FunctionComponent<Props>;
export {};
