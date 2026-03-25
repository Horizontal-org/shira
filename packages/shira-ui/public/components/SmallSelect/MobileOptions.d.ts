import { FunctionComponent } from 'react';
import { OptionInterface } from './SmallSelect';
interface Props {
    cancel: () => void;
    options: OptionInterface[];
    submit: (OptionInterface: any) => void;
}
export declare const MobileOptions: FunctionComponent<Props>;
export {};
