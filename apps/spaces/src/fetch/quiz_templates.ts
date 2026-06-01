import axios from "axios";

export interface LibraryQuizDto {
  id: number;
  title: string;
  createdAt: string;
  author: string;
  languages: string[];
  tags: string[];
}

export interface LibraryQuizQuestionTemplateDto {
  questionId: number;
  questionName: string;
  type: string;
  isPhishing: boolean;
  language: string;
  app: string;
  appType?: string;
  content: string;
  explanations: {
    position: number | string;
    text: string;
    index: number | string;
  }[];
}

type LibraryQuizApiDto = {
  id: number;
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

type LibraryQuizQuestionTemplateApiDto = {
  questionId: number;
  questionName: string;
  type?: string | null;
  isPhishing?: boolean | null;
  language: string;
  appName?: string | null;
  appType: string;
  content?: string | null;
  explanations?: {
    position: number | string;
    text: string;
    index: number | string;
  }[];
};

type LibraryQuizTemplateDetailApiDto = {
  id: number;
  title: string;
  questions?: LibraryQuizQuestionTemplateApiDto[];
  questionTemplates?: LibraryQuizQuestionTemplateApiDto[];
  quizQuestions?: LibraryQuizQuestionTemplateApiDto[];
};

const DEFAULT_LIBRARY_AUTHOR = "Shira Team";

const normalizeQuestionTemplate = (question: LibraryQuizQuestionTemplateApiDto) => {
  const isPhishing = question.isPhishing ?? question.type?.toLowerCase() === "phishing";

  return {
    questionId: question.questionId,
    questionName: question.questionName,
    type: question.type ?? (isPhishing ? "phishing" : "legitimate"),
    isPhishing,
    language: question.language,
    app: question.appName,
    appType: question.appType,
    content: question.content ?? "",
    explanations: question.explanations ?? [],
  };
};

const normalizeQuizTemplate = (quiz: LibraryQuizApiDto): LibraryQuizDto => {
  return {
    id: quiz.id,
    title: quiz.title,
    createdAt: quiz.createdAt,
    author: DEFAULT_LIBRARY_AUTHOR,
    languages: (quiz.langTags ?? []).map((language) => language.name.trim()).filter(Boolean),
    tags: (quiz.tags ?? []).map((tag) => tag.name.trim()).filter(Boolean),
  };
};

const getQuestionTemplatesFromResponse = (
  response: LibraryQuizQuestionTemplateApiDto[] | LibraryQuizTemplateDetailApiDto,
) => {
  if (Array.isArray(response)) {
    return response;
  }

  return response.questions ?? response.questionTemplates ?? response.quizQuestions ?? [];
};

export const getQuizTemplates = async (): Promise<LibraryQuizDto[]> => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates`,
      {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjb2RleC10ZXN0LXVzZXItNiIsInJvbGVzIjpbInN1cGVyLWFkbWluIiwic3BhY2UtYWRtaW4iXSwiaWF0IjoxNzc5OTk5Njk3LCJleHAiOjE3ODAwMDMyOTd9.x6UCcFZoqGZ7EPcMHmCm-a6ifzBW3eTbZTgHVwm38n8",
        }
      }
    );

    console.log(`Fetched ${res.data.length} quiz templates from library API.`);
    return res.data.map(normalizeQuizTemplate);
  } catch (err) {
    console.error("Error fetching quiz templates:", err);
    return [];
  }
};

export const getQuizTemplateQuestions = async (quizId: string | number)
  : Promise<LibraryQuizQuestionTemplateDto[]> => {
  console.log(`Fetching quiz template questions for quiz ID ${quizId} from library API...`);
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates/${quizId}/questions`,
      {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjb2RleC10ZXN0LXVzZXItNiIsInJvbGVzIjpbInN1cGVyLWFkbWluIiwic3BhY2UtYWRtaW4iXSwiaWF0IjoxNzc5OTk5Njk3LCJleHAiOjE3ODAwMDMyOTd9.x6UCcFZoqGZ7EPcMHmCm-a6ifzBW3eTbZTgHVwm38n8",
        }
      }
    );

    return getQuestionTemplatesFromResponse(res.data).map(normalizeQuestionTemplate);
  } catch (err) {
    console.error(`Error fetching quiz template questions for ${quizId}:`, err);
    return [];
  }
};
