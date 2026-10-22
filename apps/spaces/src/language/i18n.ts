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
import shiraUIfr from '@horizontal-org/shira-ui/locales/fr.json'
import shiraUIcn from '@horizontal-org/shira-ui/locales/zh_Hans.json'
import shiraUIar from '@horizontal-org/shira-ui/locales/ar.json'
import shiraUIru from '@horizontal-org/shira-ui/locales/ru.json'
import shiraUIid from '@horizontal-org/shira-ui/locales/id.json'
import shiraUIfa from '@horizontal-org/shira-ui/locales/fa.json'
import shiraUIsw from '@horizontal-org/shira-ui/locales/sw.json'

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
    translation: translationAR,
    'shira-ui': shiraUIar,
  },
  ru: {
    translation: translationRU,
    'shira-ui': shiraUIru,
  },
  id: {
    translation: translationID,
    'shira-ui': shiraUIid,
  },
  fa: {
    translation: translationFA,
    'shira-ui': shiraUIfa,
  },
  sw: {
    translation: translationSW,
    'shira-ui': shiraUIsw,
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