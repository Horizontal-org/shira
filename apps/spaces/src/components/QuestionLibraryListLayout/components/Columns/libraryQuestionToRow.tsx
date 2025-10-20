import { AppOption, LanguageOption, RowType } from ".";

export const libraryQuestionToRow = (libraryQuestion: any): RowType[] => {
  const entries = libraryQuestion ?? [] as any[];

  return entries.map((q) => {
    const langOptions: LanguageOption[] = (q.languages ?? []).map((l: any) => ({
      id: Number(l.id),
      name: String(l.name),
      content: l.content,
      explanations: (l.explanations ?? []).map((e: any) => ({
        index: e.index,
        position: e.position,
        text: e.text,
      })),
    }));

    const appOptions: AppOption[] = (q.apps ?? []).map((a: any) => ({
      id: a.id,
      name: a.name,
      type: a.type,
    }));

    const defaultLang =
      langOptions.find((v) => v.name.toLowerCase().startsWith("english")) ??
      langOptions[0];

    const defaultApp = appOptions[0];

    return {
      id: q.id,
      name: q.name,
      isPhishing: Boolean(q.isPhishing),
      type: q.type,
      app: defaultApp,
      language: defaultLang,
      content: defaultLang?.content,
      explanations: defaultLang?.explanations ?? [],
      apps: appOptions,
      languages: langOptions,
    } as RowType;
  });
};
