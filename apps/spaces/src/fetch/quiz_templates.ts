import axios from "axios";

export interface LibraryQuizDto {
  id: string | number;
  title: string;
  createdAt: string;
  author: string;
  languages: string[];
  tags: string[];
}

export interface LibraryQuizTemplatesPageDto {
  data: LibraryQuizDto[];
  total: number;
  page: number;
  limit: number;
}

export type QuizTemplateSortOption =
  | "createdAt-desc"
  | "createdAt-asc"
  | "title-asc"
  | "title-desc";

export const DEFAULT_QUIZ_TEMPLATE_SORT: QuizTemplateSortOption = "createdAt-desc";
export const DEFAULT_PAGE_LIMIT = 20;
export const DEFAULT_CREATOR_OPTIONS = "Shira Team";

interface GetQuizTemplatesParams {
  page?: number;
  limit?: number;
  search?: string;
  sortOption?: QuizTemplateSortOption;
  langTagCodes?: string[];
  tagSlugs?: string[];
}

export interface QuizTemplateFilterOption {
  value: string;
  label: string;
}

export interface LibraryQuizQuestionTemplateDto {
  questionId: number;
  questionName: string;
  isPhishing: boolean;
  language: string;
  appName: string | null;
  appType: string;
  content: string;
  explanations: {
    position: string;
    text: string;
    index: string;
  }[];
}

type LibraryQuizApiDto = {
  id: string | number;
  title: string;
  createdAt: string;
  langTags?: {
    id: number;
    name: string;
    code: string;
  }[];
  tags?: {
    id: number;
    name: string;
  }[];
};

type LibraryQuizTemplatesApiResponseDto = {
  data: LibraryQuizApiDto[];
  total: number;
  page: number;
  limit: number;
};

type ListQuizTemplatesApiQueryDto = {
  page: number;
  limit: number;
  search?: string;
  sortBy?: "createdAt" | "title";
  sortOrder?: "asc" | "desc";
  langTags?: string;
  tags?: string;
};

type QuizTemplateSortParams = {
  sortBy: "createdAt" | "title";
  sortOrder: "asc" | "desc";
};

type LibraryLangTagApiDto = {
  id: number;
  name: string;
  code: string;
};

type LibraryTagApiDto = {
  id: number;
  name: string;
  slug: string;
};


const normalizeQuizTemplate = (quiz: LibraryQuizApiDto): LibraryQuizDto => ({
  id: quiz.id,
  title: quiz.title,
  createdAt: quiz.createdAt,
  author: DEFAULT_CREATOR_OPTIONS, // TODO author
  languages: (quiz.langTags ?? []).map((language) => language.name.trim()),
  tags: (quiz.tags ?? []).map((tag) => tag.name.trim()),
});

const serializeFilterValues = (values?: string[]) => {
  if (!values?.length) { return }
  return values.join(",");
};

const getSortParamsFromSortOption = (sortOption: QuizTemplateSortOption): QuizTemplateSortParams => {
  const [sortBy, sortOrder] = sortOption.split("-") as [
    QuizTemplateSortParams["sortBy"],
    QuizTemplateSortParams["sortOrder"],
  ];

  return { sortBy, sortOrder };
};

export const getQuizTemplates = async (
  {
    page = 1,
    limit = DEFAULT_PAGE_LIMIT,
    search,
    sortOption = DEFAULT_QUIZ_TEMPLATE_SORT,
    langTagCodes,
    tagSlugs,
  }: GetQuizTemplatesParams = {},
): Promise<LibraryQuizTemplatesPageDto> => {
  try {
    const { sortBy, sortOrder } = getSortParamsFromSortOption(sortOption);
    const serializedLangTags = serializeFilterValues(langTagCodes);
    const serializedTags = serializeFilterValues(tagSlugs);

    const params: ListQuizTemplatesApiQueryDto = {
      page,
      limit,
      sortBy,
      sortOrder,
      ...(search ? { search } : {}),
      ...(serializedLangTags ? { langTags: serializedLangTags } : {}),
      ...(serializedTags ? { tags: serializedTags } : {}),
    };

    const response = await axios.get<LibraryQuizTemplatesApiResponseDto>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates`,
      { params },
    );

    return {
      data: response.data.data.map(normalizeQuizTemplate),
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  } catch (error) {
    console.error("Error fetching quiz templates:", error);
    return { data: [], total: 0, page, limit };
  }
};

export const getQuizTemplateQuestions = async (
  quizId: string | number,
): Promise<LibraryQuizQuestionTemplateDto[] | null> => {
  try {
    const response = await axios.get<LibraryQuizQuestionTemplateDto[] | null>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates/${quizId}/questions`,
    );

    return response.data;
  } catch (error) {
    console.error(`Error fetching quiz template questions for ${quizId}:`, error);
    return null;
  }
};

export const getQuizTemplateLanguageOptions = async (): Promise<QuizTemplateFilterOption[]> => {
  try {
    const response = await axios.get<LibraryLangTagApiDto[]>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/lang-tags`
    );

    return response.data.map((language) => ({
      value: language.code,
      label: language.name.trim(),
    }));
  } catch (error) {
    console.error("Error fetching quiz template language options:", error);
    return [];
  }
};

export const getQuizTemplateTagOptions = async (): Promise<QuizTemplateFilterOption[]> => {
  try {
    const response = await axios.get<LibraryTagApiDto[]>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/tags`,
    );

    return response.data.map((tag) => ({
      value: tag.slug,
      label: tag.name.trim(),
    }));
  } catch (error) {
    console.error("Error fetching quiz template tag options:", error);
    return [];
  }
};
