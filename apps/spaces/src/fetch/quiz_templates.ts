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

interface GetQuizTemplatesParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface GetAllQuizTemplatesParams {
  search?: string;
  pageSize?: number;
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
    id: number
    name: string
    code: string
  }[]
  tags?: {
    id: number
    name: string
  }[]
}

type LibraryQuizTemplatesApiResponseDto = {
  data: LibraryQuizApiDto[];
  total: number;
  page: number;
  limit: number;
}

const getQuizTemplateTimestamp = (createdAt: string) => {
  return new Date(createdAt).getTime();
};

const normalizeQuizTemplate = (quiz: LibraryQuizApiDto): LibraryQuizDto => ({
  id: quiz.id,
  title: quiz.title,
  createdAt: quiz.createdAt,
  author: "Shira Team", // TODO author
  languages: (quiz.langTags ?? []).map((language) => language.name.trim()),
  tags: (quiz.tags ?? []).map((tag) => tag.name.trim()),
})

export const getQuizTemplates = async (
  {
    page = 1,
    limit = 10,
    search,
  }: GetQuizTemplatesParams = {},
): Promise<LibraryQuizTemplatesPageDto> => {
  try {
    const response = await axios.get<LibraryQuizTemplatesApiResponseDto>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates`,
      {
        params: {
          page,
          limit,
          ...(search ? { search } : {}),
        },
        withCredentials: false, // TODO remove
      },
    )

    return {
      data: response.data.data.map(normalizeQuizTemplate),
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    }
  } catch (error) {
    console.error("Error fetching quiz templates:", error)
    // TODO check error response
    return { data: [], total: 0, page, limit }
  }
}

export const getAllQuizTemplates = async (
  { search, pageSize = 100 }: GetAllQuizTemplatesParams = {},
): Promise<LibraryQuizDto[]> => {
  const firstPage = await getQuizTemplates({
    page: 1,
    limit: pageSize,
    search,
  });

  const totalPages = Math.max(1, Math.ceil(firstPage.total / firstPage.limit));

  if (totalPages === 1) {
    return firstPage.data;
  }

  const allRemainingPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) => (
      getQuizTemplates({
        page: index + 2,
        limit: firstPage.limit,
        search,
      })
    )),
  );

  return [
    ...firstPage.data,
    ...allRemainingPages.flatMap((page) => page.data),
  ];
};

export const sortQuizTemplates = (
  quizzes: LibraryQuizDto[],
  sortOption: QuizTemplateSortOption = DEFAULT_QUIZ_TEMPLATE_SORT,
): LibraryQuizDto[] => {
  return [...quizzes].sort((firstQuiz, secondQuiz) => {
    const firstTitle = firstQuiz.title.trim().toLowerCase();
    const secondTitle = secondQuiz.title.trim().toLowerCase();

    switch (sortOption) {
      case "createdAt-asc":
        return getQuizTemplateTimestamp(firstQuiz.createdAt) - getQuizTemplateTimestamp(secondQuiz.createdAt);
      case "title-asc":
        return firstTitle.localeCompare(secondTitle);
      case "title-desc":
        return secondTitle.localeCompare(firstTitle);
      case "createdAt-desc":
      default:
        return getQuizTemplateTimestamp(secondQuiz.createdAt) - getQuizTemplateTimestamp(firstQuiz.createdAt);
    }
  });
};

export const getQuizTemplateQuestions = async (quizId: string | number)
  : Promise<LibraryQuizQuestionTemplateDto[] | null> => {
  try {
    const response = await axios.get<LibraryQuizQuestionTemplateDto[] | null>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates/${quizId}/questions`,
      { withCredentials: false }, // TODO remove
    )

    return response.data
  } catch (error) {
    console.error(`Error fetching quiz template questions for ${quizId}:`, error)
    // TODO check error response
    return null
  }
}
