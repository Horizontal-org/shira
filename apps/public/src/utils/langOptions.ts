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
    nativeLabel: NATIVE_LANGUAGE_NAMES.en,
    value: 'en',
  },
  {
    label: t('languages.es'),
    nativeLabel: NATIVE_LANGUAGE_NAMES.es,
    value: 'es',
  },
  {
    label: t('languages.fr'),
    nativeLabel: NATIVE_LANGUAGE_NAMES.fr,
    value: 'fr',
  },
  {
    label: t('languages.cn'),
    nativeLabel: NATIVE_LANGUAGE_NAMES.cn,
    value: 'cn',
  },
  {
    label: t('languages.ar'),
    nativeLabel: NATIVE_LANGUAGE_NAMES.ar,
    value: 'ar',
  },
  {
    label: t('languages.ru'),
    nativeLabel: NATIVE_LANGUAGE_NAMES.ru,
    value: 'ru',
  },
]
