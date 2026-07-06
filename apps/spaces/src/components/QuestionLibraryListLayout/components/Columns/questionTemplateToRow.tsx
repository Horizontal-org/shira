import type { App } from "../../../../fetch/app";
import type { Language as StoreLanguage } from "../../../../store/slices/languages";
import type { LibraryQuestionTemplateDto } from "../../../../fetch/question_templates";
import { getAppsByType, normalizePreviewAppName } from "../../../../utils/appNames";
import { AppOption, LanguageOption, RowType } from ".";

const normalizeAppComparisonValue = (value: string) =>
  normalizePreviewAppName(value).trim().toLowerCase();

const normalizeLanguages = (
  question: LibraryQuestionTemplateDto,
  languages: StoreLanguage[],
): LanguageOption[] => {
  const matchedLanguages = question.languages
    .map((languageName, index) => {
      const matchedLanguage = languages.find((language) => language.name === languageName);

      if (!matchedLanguage) {
        return {
          id: -(index + 1),
          name: languageName,
          content: question.content,
          explanations: [],
        };
      }

      return {
        id: Number(matchedLanguage.id),
        name: matchedLanguage.name,
        content: question.content,
        explanations: [],
      };
    });

  return matchedLanguages.length > 0
    ? matchedLanguages
    : [{
      id: -1,
      name: "English",
      content: question.content,
      explanations: [],
    }];
};

const normalizeApps = (
  question: LibraryQuestionTemplateDto,
  apps: App[],
): AppOption[] => {
  const appsForType = apps.filter((app) => app.type === question.appType);

  if (appsForType.length > 0) {
    return appsForType.map((app) => ({
      id: Number(app.id),
      name: app.name,
      type: app.type,
    }));
  }

  const fallbackApps = getAppsByType(question.appType).map((app, index) => ({
    id: -(index + 1),
    name: app.name,
    type: app.type,
  }));

  return fallbackApps.length > 0
    ? fallbackApps
    : [{
      id: -1,
      name: question.defaultApp ?? question.appType,
      type: question.appType,
    }];
};

export const questionTemplateToRow = (
  questionTemplates: LibraryQuestionTemplateDto[] | null | undefined,
  apps: App[],
  languages: StoreLanguage[],
): RowType[] => {
  const entries = questionTemplates ?? [];

  return entries.map((q) => {
    const langOptions = normalizeLanguages(q, languages);
    const appOptions = normalizeApps(q, apps);
    const preferredAppName = q.defaultApp
      ? normalizeAppComparisonValue(q.defaultApp)
      : null;

    const defaultLang =
      langOptions.find((v) => v.name.toLowerCase().startsWith("english")) ??
      langOptions[0];

    const defaultApp = (
      preferredAppName
        ? appOptions.find(
          (app) => normalizeAppComparisonValue(app.name) === preferredAppName,
        )
        : undefined
    ) ?? appOptions[0];

    return {
      id: q.id,
      name: q.name,
      isPhishing: Boolean(q.isPhishing),
      type: q.appType,
      creator: "Shira team",
      createdAt: q.createdAt,
      tags: q.tags,
      app: defaultApp,
      language: defaultLang,
      content: q.content,
      explanations: q.explanations.map((explanation) => ({
        index: Number(explanation.index),
        position: Number(explanation.position),
        text: explanation.text,
      })),
      apps: appOptions,
      languages: langOptions,
    } as RowType;
  });
};
