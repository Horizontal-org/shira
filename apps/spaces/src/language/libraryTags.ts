import i18n from "./i18n";

const translate = (key: string, fallback: string) =>
  i18n.t(key, { defaultValue: fallback });

const toKey = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const languageCodeByName: Record<string, string> = {
  english: "en",
  spanish: "es",
  french: "fr",
  mandarin: "cn",
  "chinese (simplified)": "zh",
  arabic: "ar",
  russian: "ru",
  indonesian: "id",
  persian: "fa",
  swahili: "sw",
};

/**
 * Library tags have a stable slug, so use that—not their English label—as the
 * translation key. This keeps translations intact if the Library API label is
 * edited.
 */
export const translateLibraryTag = (slug: string | undefined, name: string) =>
  translate(`library_metadata.tags.${slug ?? toKey(name)}`, name.trim());

/** Language-tag codes are the stable identifiers used by template filters. */
export const translateLibraryLanguageTag = (
  code: string | undefined,
  name: string,
) =>
  translate(
    `library_metadata.language_tags.${code?.toLowerCase() ?? languageCodeByName[toKey(name)] ?? toKey(name)}`,
    name.trim(),
  );
