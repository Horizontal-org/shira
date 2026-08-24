import axios from "axios";
import {
  translateDefaultLibraryLanguage,
  translateLibraryLanguageTag,
  translateLibraryTag,
} from "../language/libraryTags";

export const DEFAULT_QUIZ_TEMPLATE_SORT: QuizTemplateSortOption = "createdAt-desc";
export const DEFAULT_PAGE_LIMIT = 20;
export const DEFAULT_CREATOR_OPTIONS = "Shira Team";

export interface LibraryQuizCreatorDto {
  publicSpaceId: string;
  displayName: string;
}

export interface LibraryQuizDto {
  id: string | number;
  title: string;
  createdAt: string;
  author: string;
  authorPublicSpaceId?: string;
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

interface GetQuizTemplatesParams {
  page?: number;
  limit?: number;
  search?: string;
  sortOption?: QuizTemplateSortOption;
  langTagCodes?: string[];
  tagSlugs?: string[];
  author?: string;
}

export interface LibraryQuizQuestionTemplateDto {
  questionId: number;
  questionName: string;
  isPhishing: boolean;
  language: string;
  languageCode: string | null;
  appName: string | null;
  appType: string;
  content: string;
  explanations: {
    position: string;
    text: string;
    index: string;
  }[];
  images?: { id: number; name: string; url: string }[];
}

type LibraryQuizQuestionTemplateApiDto = Omit<
  LibraryQuizQuestionTemplateDto,
  "language"
> & {
  language: string | null;
};

type LibraryQuizApiDto = {
  id: string | number;
  title: string;
  createdAt: string;
  author?: {
    displayName: string;
    publicSpaceId: string;
  };
  langTags?: {
    id: number;
    name: string;
    code: string;
  }[];
  tags?: {
    id: number;
    name: string;
    slug?: string;
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
  author?: string;
};

type QuizTemplateSortParams = {
  sortBy: "createdAt" | "title";
  sortOrder: "asc" | "desc";
};

const normalizeQuizTemplate = (
  quiz: LibraryQuizApiDto,
): LibraryQuizDto => ({
  id: quiz.id,
  title: quiz.title,
  createdAt: quiz.createdAt,
  author: quiz.author?.displayName ?? DEFAULT_CREATOR_OPTIONS,
  authorPublicSpaceId: quiz.author?.publicSpaceId,
  languages: (quiz.langTags ?? []).map((language) =>
    translateLibraryLanguageTag(language.code, language.name),
  ),
  tags: (quiz.tags ?? []).map((tag) => translateLibraryTag(tag.slug, tag.name)),
});

const normalizeQuizQuestionTemplate = (
  question: LibraryQuizQuestionTemplateApiDto,
): LibraryQuizQuestionTemplateDto => ({
  ...question,
  language: question.language
    ? translateLibraryLanguageTag(question.languageCode, question.language)
    : translateDefaultLibraryLanguage(),
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
    author,
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
      ...(author ? { author } : {}),
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

export const getQuizTemplateCreators = async (): Promise<LibraryQuizCreatorDto[]> => {
  try {
    const response = await axios.get<LibraryQuizCreatorDto[]>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates/creators`,
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching quiz template creators:", error);
    return [];
  }
};

export const getQuizTemplateQuestions = async (
  quizId: string | number,
): Promise<LibraryQuizQuestionTemplateDto[] | null> => {
  try {
    const response = await axios.get<LibraryQuizQuestionTemplateApiDto[] | null>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates/${quizId}/questions`,
    );

    return response.data?.map(normalizeQuizQuestionTemplate) ?? null;

  } catch (error) {
    console.error(`Error fetching quiz template questions for ${quizId}:`, error);
    return null;
  }
};
