import i18n from "./i18n";

const translate = (key: string, fallback: string) =>
  i18n.t(key, { defaultValue: fallback });

const createSlugFromString = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const translateDefaultLibraryLanguage = () =>
  translateLibraryLanguageTag("English");

// Library tags have a stable slug, so use that as the translation key
export const translateLibraryTag = (slug: string | undefined, name: string) =>
  translate(`library_metadata.tags.${slug ?? createSlugFromString(name)}`, name.trim());

export const translateLibraryLanguageTag = (name: string) =>
  translate(`select_languages.${createSlugFromString(name)}`, name.trim());
