import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const libraryApiUrl = process.env.REACT_APP_LIBRARY_API_URL;

export const DEFAULT_PAGE_LIMIT = 20;
export type SubmissionStatus = "in_review" | "approved" | "rejected";

interface BaseSubmissionDto {
  id: string;
  resourceId: string;
  dateSubmitted: string;
  status: SubmissionStatus;
  reason?: string;
}

export interface QuizSubmissionDto extends BaseSubmissionDto {
  resourceType: "quiz_template";
  quizTitle: string;
}

export interface QuestionSubmissionDto extends BaseSubmissionDto {
  resourceType: "question_template";
  questionName: string;
}

export interface LanguageTagDto {
  id: number;
  name: string;
  code: string;
}

export interface SubmissionExplanationDto {
  position: string;
  text: string;
  index: string;
}

export interface QuestionSubmissionPreviewDto extends QuestionSubmissionDto {
  appType: string;
  app: string;
  language: string;
  isPhishing: boolean;
  tags: string[];
  content: string;
  explanations: SubmissionExplanationDto[];
}

export interface QuizSubmissionQuestionPreviewDto extends BaseSubmissionDto {
  id: string;
  resourceId: string;
  resourceType: "question_template";
  questionName: string;
  appType: string;
  app: string;
  language: string;
  isPhishing: boolean;
  content: string;
  explanations: SubmissionExplanationDto[];
}

export interface QuizSubmissionPreviewDto extends QuizSubmissionDto {
  description: string;
  langTags: LanguageTagDto[];
  tags: string[];
  questions: QuizSubmissionQuestionPreviewDto[];
}

export interface SubmissionsPageDto<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface LibraryQuestionTemplateDto {
  id: number;
  name: string;
  isPhishing: boolean;
  content: string;
  appType: string;
  defaultApp: string | null;
  langTags: LanguageTagDto[];
  tags: Array<{ name: string }>;
  explanations: Array<{
    position: string;
    positionIndex: string;
    content: string;
  }>;
}

export interface LibraryQuizTemplateDto {
  id: number;
  title: string;
  description: string;
  langTags: LanguageTagDto[];
  tags: Array<{ name: string }>;
}

export interface LibraryQuizQuestionDto {
  questionId: number;
  questionName: string;
  isPhishing: boolean;
  language: string | null;
  appName: string | null;
  appType: string;
  content: string;
  explanations: SubmissionExplanationDto[];
}

interface GetSubmissionsParams {
  page?: number;
  limit?: number;
}

export interface PublishSubmissionPayload {
  spaceDisplayName: string;
  templateName?: string;
  templateDescription?: string;
  langTagIds?: number[];
  tagIds?: number[];
}

export const publishQuizSubmission = async (
  quizId: number,
  payload: PublishSubmissionPayload,
) => {
  await axios.post(`${apiUrl}/library/quiz/${quizId}/publish`, payload);
};

export const publishQuestionSubmission = async (
  questionId: number,
  payload: PublishSubmissionPayload,
) => {
  await axios.post(`${apiUrl}/library/question/${questionId}/publish`, payload);
};

export const getQuestionSubmissions = async (
  publicSpaceId: string,
  {
    page = 1,
    limit = DEFAULT_PAGE_LIMIT,
  }: GetSubmissionsParams = {},
): Promise<SubmissionsPageDto<QuestionSubmissionDto>> => {
  const { data } = await axios.get<
    SubmissionsPageDto<QuestionSubmissionDto>
  >(`${libraryApiUrl}/authors/${publicSpaceId}/question-submissions`, {
    params: { page, limit },
  });

  return data;
};

export const getQuizSubmissions = async (
  publicSpaceId: string,
  {
    page = 1,
    limit = DEFAULT_PAGE_LIMIT,
  }: GetSubmissionsParams = {},
): Promise<SubmissionsPageDto<QuizSubmissionDto>> => {
  const { data } = await axios.get<SubmissionsPageDto<QuizSubmissionDto>>(
    `${libraryApiUrl}/authors/${publicSpaceId}/quiz-submissions`,
    {
      params: { page, limit },
    },
  );

  return data;
};

export const getQuestionSubmissionTemplate = async (
  resourceId: string,
): Promise<LibraryQuestionTemplateDto> => {
  const { data } = await axios.get<LibraryQuestionTemplateDto>(
    `${libraryApiUrl}/question-templates/${resourceId}`,
  );

  return data;
};

export const getQuizSubmissionTemplate = async (
  resourceId: string,
): Promise<LibraryQuizTemplateDto> => {
  const { data } = await axios.get<LibraryQuizTemplateDto>(
    `${libraryApiUrl}/quiz-templates/${resourceId}`,
  );

  return data;
};

export const getQuizSubmissionQuestions = async (
  resourceId: string,
): Promise<LibraryQuizQuestionDto[]> => {
  const { data } = await axios.get<LibraryQuizQuestionDto[]>(
    `${libraryApiUrl}/quiz-templates/${resourceId}/questions`,
  );

  return data;
};
