import i18n from "./i18n";

const translate = (key: string, fallback: string) =>
  i18n.t(key, { defaultValue: fallback });

const createSlugFromString = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Library tags have a stable slug, so use that—not their English label—as the
 * translation key. This keeps translations intact if the Library API label is
 * edited.
 */
export const translateLibraryTag = (slug: string | undefined, name: string) =>
  translate(`library_metadata.tags.${slug ?? createSlugFromString(name)}`, name.trim());

/** Language-tag codes are the stable identifiers used by template filters. */
export const translateLibraryLanguageTag = (
  code: string | null,
  name: string,
) =>
  translate(
    `library_metadata.language_tags.${code?.toLowerCase() ?? createSlugFromString(name)}`,
    name.trim(),
  );

export const translateDefaultLibraryLanguage = () =>
  translateLibraryLanguageTag("en", "English");
