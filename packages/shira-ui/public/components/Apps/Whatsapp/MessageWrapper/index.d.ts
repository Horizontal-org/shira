import { FunctionComponent } from 'react';
interface Props {
    phone?: {
        textContent: string;
        explanationPosition: string;
    };
    content?: HTMLElement;
}
declare const MessageWrapper: FunctionComponent<Props>;
export default MessageWrapper;
