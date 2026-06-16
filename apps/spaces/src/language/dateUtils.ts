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

// Example: 8 June 2026
export const formatDateCreated = (value: string) => {
  return new Date(value)
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
};
