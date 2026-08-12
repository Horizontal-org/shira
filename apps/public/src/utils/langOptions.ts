import { LanguageSelectOption } from '@horizontal-org/shira-ui'
import { TFunction } from 'i18next'

const NATIVE_LANGUAGE_NAMES = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  cn: '简体中文',
  ar: 'العربية',
  ru: 'Русский',
} as const

export const getLanguageOptions = (t: TFunction): LanguageSelectOption[] => [
  {
    label: t('languages.en'),
    labelEnglish: NATIVE_LANGUAGE_NAMES.en,
    value: 'en',
  },
  {
    label: t('languages.es'),
    labelEnglish: NATIVE_LANGUAGE_NAMES.es,
    value: 'es',
  },
  {
    label: t('languages.fr'),
    labelEnglish: NATIVE_LANGUAGE_NAMES.fr,
    value: 'fr',
  },
  {
    label: t('languages.cn'),
    labelEnglish: NATIVE_LANGUAGE_NAMES.cn,
    value: 'cn',
  },
  {
    label: t('languages.ar'),
    labelEnglish: NATIVE_LANGUAGE_NAMES.ar,
    value: 'ar',
  },
  {
    label: t('languages.ru'),
    labelEnglish: NATIVE_LANGUAGE_NAMES.ru,
    value: 'ru',
  },
]
