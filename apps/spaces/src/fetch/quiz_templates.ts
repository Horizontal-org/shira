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
  sortOption?: QuizTemplateSortOption;
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

const getSortOrderFromSortOption = (sortOption: QuizTemplateSortOption) => {
  if (sortOption === "createdAt-asc") {
    return "asc";
  }

  if (sortOption === "createdAt-desc") {
    return "desc";
  }

  return;
};

const normalizeQuizTemplate = (quiz: LibraryQuizApiDto): LibraryQuizDto => ({
  id: quiz.id,
  title: quiz.title,
  createdAt: quiz.createdAt,
  author: "Shira Team", // TODO author
  languages: (quiz.langTags ?? []).map((language) => language.name.trim()),
  tags: (quiz.tags ?? []).map((tag) => tag.name.trim()),
});

export const getQuizTemplates = async (
  {
    page = 1,
    limit = 10,
    search,
    sortOption = DEFAULT_QUIZ_TEMPLATE_SORT,
  }: GetQuizTemplatesParams = {},
): Promise<LibraryQuizTemplatesPageDto> => {
  try {
    const sortOrder = getSortOrderFromSortOption(sortOption);

    const response = await axios.get<LibraryQuizTemplatesApiResponseDto>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates`,
      {
        params: {
          page,
          limit,
          ...(sortOrder ? { sortOrder } : {}),
          ...(search ? { search } : {}),
        },
        withCredentials: false, // TODO remove
      },
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
      { withCredentials: false }, // TODO remove
    );

    return response.data;
  } catch (error) {
    console.error(`Error fetching quiz template questions for ${quizId}:`, error);
    return null;
  }
};