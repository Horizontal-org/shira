import axios from "axios";
import { normalizePreviewAppName } from "../utils/appNames";

export interface LibraryQuizDto {
  id: number;
  title: string;
  createdAt: string;
  author: string;
  languages: string[];
  tags: string[];
}

export interface LibraryQuizQuestionTemplateDto {
  question_id: number;
  question_name: string;
  type: string;
  language: string;
  app: string;
  content: string;
  explanations: {
    position: number;
    text: string;
    index: number;
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
  question_id: number;
  question_name: string;
  type: string;
  language: string;
  app: string;
  content?: string | null;
  explanations?: {
    position: number;
    text: string;
    index: number;
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
  return {
    question_id: question.question_id,
    question_name: question.question_name,
    type: question.type,
    language: question.language,
    app: normalizePreviewAppName(question.app),
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
    const res = await axios.get<LibraryQuizApiDto[]>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates`,
      {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjb2RleC10ZXN0LXVzZXItNiIsInJvbGVzIjpbInN1cGVyLWFkbWluIiwic3BhY2UtYWRtaW4iXSwiaWF0IjoxNzc5OTk5Njk3LCJleHAiOjE3ODAwMDMyOTd9.x6UCcFZoqGZ7EPcMHmCm-a6ifzBW3eTbZTgHVwm38n8",
        }
      }
    );

    return res.data.map(normalizeQuizTemplate);
  } catch (err) {
    console.error("Error fetching quiz templates:", err);
    return [];
  }
};

export const getQuizTemplateQuestions = async (quizId: string | number, questionId: string | number)
  : Promise<LibraryQuizQuestionTemplateDto[]> => {
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
