import type { Preview } from "@storybook/react";
import { defaultTheme, ThemeProvider } from "../src/theme";
import { createGlobalStyle } from 'styled-components'
import i18n from 'i18next'
import { initReactI18next, I18nextProvider } from 'react-i18next'
import en from '../locales/en.json'

i18n.use(initReactI18next).init({
  resources: { en: { 'shira-ui': en } },
  lng: 'en',
  ns: ['shira-ui'],
  defaultNS: 'shira-ui',
})

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  `;

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <Story />
        </ThemeProvider>
      </I18nextProvider>
    )
  ],
  tags: ['autodocs'],
};

export default preview;
