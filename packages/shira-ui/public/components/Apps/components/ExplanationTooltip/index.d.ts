import { FunctionComponent } from 'react';
import { Explanation } from '../../../../domain/explanation';
interface Props {
    explanation: Explanation;
    explanationNumber?: number;
    showExplanations?: boolean;
}
declare const ExplanationTooltip: FunctionComponent<Props>;
export default ExplanationTooltip;
