import { FunctionComponent } from 'react';
export interface MobileMenuProps {
    onNavigate: (route: string) => void;
    onClose: () => void;
    translatedTexts: {
        home: string;
        about: string;
        logIn: string;
        createSpace: string;
    };
}
export declare const MobileMenu: FunctionComponent<MobileMenuProps>;
