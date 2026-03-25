import { FunctionComponent } from 'react';
import { OptionInterface } from './SmallSelect';
interface Props {
    option: OptionInterface;
    index: number;
    submit: () => void;
}
export declare const Option: FunctionComponent<Props>;
export {};
