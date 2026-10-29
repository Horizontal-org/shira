import i18n from "i18next";
import { initReactI18next } from "react-i18next";


// Importing translation files

import translationEN from "./locales/en.json";
import translationES from "./locales/es.json";
import translationFR from "./locales/fr.json";
import translationMandarin from './locales/cn.json'
import translationArabic from './locales/ar.json'
import translationRussian from './locales/ru.json'
import translationIndonesian from './locales/id.json'
import translationSwahili from './locales/sw.json'
import translationFarsi from './locales/fa.json'
import shiraUIen from '@horizontal-org/shira-ui/locales/en.json'
import shiraUIes from '@horizontal-org/shira-ui/locales/es.json'
import shiraUIfr from '@horizontal-org/shira-ui/locales/fr.json'
import shiraUIcn from '@horizontal-org/shira-ui/locales/zh_Hans.json'
import shiraUIar from '@horizontal-org/shira-ui/locales/ar.json'
import shiraUIru from '@horizontal-org/shira-ui/locales/ru.json'
import shiraUIid from '@horizontal-org/shira-ui/locales/id.json'
import shiraUIsw from '@horizontal-org/shira-ui/locales/sw.json'
import shiraUIfa from '@horizontal-org/shira-ui/locales/fa.json'
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
    'shira-ui': shiraUIfr,
  },
  cn: {
    translation: translationMandarin,
    'shira-ui': shiraUIcn,
  },
  ar: {
    translation: translationArabic,
    'shira-ui': shiraUIar,
  },
  ru: {
    translation: translationRussian,
    'shira-ui': shiraUIru,
  },
  id: {
    translation: translationIndonesian,
    'shira-ui': shiraUIid,
  },
  sw: {
    translation: translationSwahili,
    'shira-ui': shiraUIsw,
  },
  fa: {
    translation: translationFarsi,
    'shira-ui': shiraUIfa,
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
    // keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

// RTL languages mirror the whole site (layout direction) automatically as soon
// as they're selected, no separate toggle needed.
const RTL_LANGUAGES = ['ar', 'fa'];

const syncDocumentDirection = (lng: string) => {
  document.documentElement.dir = RTL_LANGUAGES.includes(lng) ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
};

i18n.on('languageChanged', syncDocumentDirection);
syncDocumentDirection(i18n.language);

export default i18n;