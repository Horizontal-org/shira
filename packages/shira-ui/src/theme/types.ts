// src/theme/types.ts
export interface Theme {
    breakpoints: {
      xl: string;
      lg: string;
      md: string;
      sm: string;
      xs: string;
    };
    spacing: {
      md: string;
    };
    primary: {
      base: string;
      dark: string;
    };
    secondary: {
      veryDark: string;
      dark: string;
      base: string;
      light: string;
    };
    colors: {
      green1: string;
      green2: string;
      green3: string;
      green4: string;
      green5: string;
      green6: string;
      green7: string;
      green8: string;
      green9: string;
      green10: string;
      blue1: string;
      blue2: string;
      blue3: string;
      blue4: string;
      blue5: string;
      blue6: string;
      blue7: string;
      blue8: string;
      blue9: string;
      blue10: string;
      success1: string;
      success2: string;
      success3: string;
      success4: string;
      success5: string;
      warning1: string;
      warning2: string;
      warning3: string;
      warning4: string;
      warning5: string;
      error1: string;
      error2: string;
      error3: string;
      error4: string;
      error5: string;
      error6: string;
      error7: string;
      error8: string;
      error9: string;
      dark: {
        black: string;
        darkGrey: string;
        mediumGrey: string;
        overlay: string;
      };
      light: {
        white: string;
        paleGrey: string;
        paleGreen: string;
      };
      others: {
        whatsapp: string;
        telegram: string;
        facebook: string;
        dating: string;
      };
    };
    apps: {
      whatsapp: string;
      gmail: string;
      messenger: string;
      sms: string;
      datingapp: string;
    };
}
  