import { Theme } from './types'

export const defaultTheme: Theme = {
    breakpoints: {
      xl: '1700px',
      lg: '1440px',
      md: '1024px',
      sm: '800px',
      xs: '490px'
    },
    spacing: {
      md: '10px'
    },
    primary: {
      base: '#12A4C6',
      dark: '#2693C2'
    },
    secondary: {
      veryDark: '#3F6A3A',
      dark: '#9DB149',
      base: '#C1D24B',
      light: '#ECF3CC'
    },
    colors: {
      green1: '#F3F9CF',
      green2: '#DBE3A3',
      green3: '#BDD36A',
      green4: '#9FB747',
      green5: '#849D29',
      green6: '#658840',
      green7: '#52752C',
      green8: '#3F6A3A',
      green9: '#264D22',
      green10: '#12320F',
      blue1: '#D5F2FF',
      blue2: '#ACE6FF',
      blue3: '#93D8F5',
      blue4: '#69C2E8',
      blue5: '#50AFD8',
      blue6: '#2F9FCF',
      blue7: '#117AA7',
      blue8: '#176D92',
      blue9: '#095171',
      blue10: '#0A3B51',
      success1: '#58D347',
      success2: '#56BB48',
      success3: '#44A336',
      success4: '#2F8722',
      success5: '#1C6611',
      warning1: '#FEDF71',
      warning2: '#F8D145',
      warning3: '#E7BD27',
      warning4: '#D2AA1A',
      warning5: '#C29C13',
      error1: '#FFB9B1',
      error2: '#FFA399',
      error3: '#FE8A7E',
      error4: '#F87163',
      error5: '#EE5A4B',
      error6: '#D84334',
      error7: '#BF2E1F',
      error8: '#A51D0F',
      error9: '#871408',
      dark: {
        black: '#333030',
        darkGrey: '#5F6368',
        mediumGrey: '#ACADAE',
        overlay: 'rgba(51, 48, 48, 0.64)'
      },
      light: {
        white: '#fff',
        paleGrey: '#f3f3f3',
        paleGreen: '#F3F5E4'
      },
      others: {
        whatsapp: '#25D366',
        telegram: '#039BE5',
        facebook: '#335A9F',
        dating: '#FD6D7E'
      }
    },
    apps: {
      whatsapp: '#25D366',
      gmail: '#ffffff',
      messenger: '#335A9F',
      sms: '#C1D24B',
      datingapp: '#FD6D7E'
    }
};