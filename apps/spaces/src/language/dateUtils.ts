import { format } from "date-fns";
import { ar, enGB, enUS, es, faIR, fr, id, ru, zhCN } from "date-fns/locale";
import i18n from "./i18n";

// Centralize locale calls for when we add more
export const getCurrentDateFNSLocales = () => {
  return {
    en: enGB,
    es: es,
    fr: fr,
    cn: zhCN,
    ar: ar,
    fa: faIR,
    id: id,
    ru: ru,
  };
};

const parseDateValue = (value: string) => {
  const isoDateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (isoDateMatch) {
    const [, year, month, day] = isoDateMatch;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  return new Date(value);
};

export const formatLocaleDate = (value: string, language?: string) => {
  const locale = getCurrentDateFNSLocales()[language ?? i18n.language] ?? enUS;

  return format(parseDateValue(value), "d MMMM y", { locale });
};

export const formatLocaleShortDate = (value: string, language?: string) => {
  const locale = getCurrentDateFNSLocales()[language ?? i18n.language] ?? enUS;

  return format(parseDateValue(value), "PP", { locale });
};
