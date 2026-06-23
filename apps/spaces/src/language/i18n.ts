import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importing translation files
import translationEN from "./locales/en.json";
import translationES from "./locales/es.json";
import translationFR from "./locales/fr.json";
import translationMandarin from './locales/cn.json'
import translationAR from './locales/ar.json'
import translationRU from './locales/ru.json'
import translationID from './locales/id.json'
import translationFA from './locales/fa.json'
import translationSW from './locales/sw.json'
import shiraUIen from '@horizontal-org/shira-ui/locales/en.json'
import shiraUIes from '@horizontal-org/shira-ui/locales/es.json'

//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
    'shira-ui': shiraUIen,
  },
  es: {
    translation: translationES,
    'shira-ui': shiraUIes,
  },
  fr: {
    translation: translationFR,
  },
  cn: {
    translation: translationMandarin
  },
  ar: {
    translation: translationAR,
  },
  ru: {
    translation: translationRU,
  },
  id: {
    translation: translationID,
  },
  fa: {
    translation: translationFA,
  },
  sw: {
    translation: translationSW,
  },
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
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;