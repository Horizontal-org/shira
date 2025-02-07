import i18n from "i18next";
import { initReactI18next } from "react-i18next";


// Importing translation files

import translationEN from "./locales/en.json";
import translationES from "./locales/es.json";
import translationFR from "./locales/fr.json";
import translationMandarin from './locales/cn.json'

//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
  fr: {
    translation: translationFR,
  },
  cn: {
    translation: translationMandarin
  }
};

//i18N Initialization

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:"en", //default language
    fallbackLng: 'en',
    // keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;