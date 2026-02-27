import { enUS, es, fr, zhCN } from "date-fns/locale";

//Centralize locale calls for one we add more
export const getCurrentDateFNSLocales = () => {
  return {
    en: enUS,
    es: es,
    fr: fr,
    cn: zhCN
  };
}