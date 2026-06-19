import i18n from "i18next";
import { initReactI18next } from "react-i18next";


// Importing translation files

import translationEN from "./locales/en.json";
import translationES from "./locales/es.json";
import translationFR from "./locales/fr.json";
import translationMandarin from './locales/cn.json'
import translationArabic from './locales/ar.json'
import translationRussian from './locales/ru.json'
import shiraUIen from '@horizontal-org/shira-ui/locales/en.json'

//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
    'shira-ui': shiraUIen,
  },
  es: {
    translation: translationES,
  },
  fr: {
    translation: translationFR,
  },
  cn: {
    translation: translationMandarin
  },
  ar: {
    translation: translationArabic
  },
  ru: {
    translation: translationRussian
  }
};

//i18N Initialization

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", //default language
    fallbackLng: 'en',
    returnEmptyString: false,
    ns: ['translation', 'shira-ui'],
    defaultNS: 'translation',
    // keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;