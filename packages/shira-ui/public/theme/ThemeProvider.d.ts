import { default as React } from 'react';
import { Theme } from './types';
interface ThemeProviderProps {
    theme?: Theme;
    children: React.ReactNode;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export {};
