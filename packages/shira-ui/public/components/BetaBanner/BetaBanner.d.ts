import { FunctionComponent } from 'react';
export interface BetaBannerProps {
    url?: string;
    label?: string;
    message?: string;
    clickHereText?: string;
    feedbackText?: string;
}
export declare const BetaBanner: FunctionComponent<BetaBannerProps>;
