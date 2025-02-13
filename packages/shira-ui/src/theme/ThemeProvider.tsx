import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Theme } from './types';
import { defaultTheme } from './defaultTheme';

interface ThemeProviderProps {
  theme?: Theme;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  theme,
  children 
}) => {
  const mergedTheme = {
    ...defaultTheme,
    ...(theme || {})
  }
  return (
    <StyledThemeProvider theme={mergedTheme}>
      {children}
    </StyledThemeProvider>
  );
};