import "styled-components";
import type { Theme } from "./types";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

// src/theme/index.ts
export * from './types';
export * from './defaultTheme';
export * from './ThemeProvider';
