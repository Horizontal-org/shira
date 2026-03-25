import { default as React } from 'react';
export interface NavbarProps {
    color?: string;
    onNavigate: (route: string) => void;
    translatedTexts: {
        home: string;
        about: string;
        menu: string;
        logIn: string;
        createSpace: string;
    };
}
export declare const Navbar: React.FC<NavbarProps>;
