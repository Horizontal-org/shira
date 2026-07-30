import axios from "axios";

export const DEFAULT_SUBMISSIONS_PAGE_LIMIT = 20;
export type SubmissionStatus = "in_review" | "approved" | "rejected";

export interface QuizSubmissionDto {
  id: string;
  title: string;
  dateSubmitted: string;
  status: SubmissionStatus;
  reason?: string;
}

export interface LanguageTagDto {
  id: number;
  name: string;
  code: string;
}

export interface QuestionSubmissionDto {
  id: string;
  questionName: string;
  dateSubmitted: string;
  status: SubmissionStatus;
  reason?: string;
}

export interface QuestionSubmissionExplanationDto {
  position: string;
  text: string;
  index: string;
}

export interface QuestionSubmissionDetailDto extends QuestionSubmissionDto {
  appType: string;
  app: string;
  language: string;
  isPhishing: boolean;
  tags: string[];
  content: string;
  explanations: QuestionSubmissionExplanationDto[];
}

export interface QuizSubmissionDetailDto extends QuizSubmissionDto {
  description: string;
  langTags: LanguageTagDto[];
  tags?: string[];
  questions: QuestionSubmissionDetailDto[];
}

export interface SubmissionsPageDto<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

interface GetSubmissionsParams {
  page?: number;
  limit?: number;
}

interface QuizSubmissionApiDto
  extends Omit<QuizSubmissionDto, "title"> {
  quizTitle: string;
}

export const getQuestionSubmissions = async (
  publicSpaceId: string,
  {
    page = 1,
    limit = DEFAULT_SUBMISSIONS_PAGE_LIMIT,
  }: GetSubmissionsParams = {},
): Promise<SubmissionsPageDto<QuestionSubmissionDto>> => {
  const { data } = await axios.get<SubmissionsPageDto<QuestionSubmissionDto>>
    (`${process.env.REACT_APP_LIBRARY_API_URL}/authors/${publicSpaceId}/question-submissions`, {
      params: { page, limit },
    });

  return data;
};

export const getQuizSubmissions = async (
  publicSpaceId: string,
  {
    page = 1,
    limit = DEFAULT_SUBMISSIONS_PAGE_LIMIT,
  }: GetSubmissionsParams = {},
): Promise<SubmissionsPageDto<QuizSubmissionDto>> => {
  const { data } = await axios.get<SubmissionsPageDto<QuizSubmissionApiDto>>
    (`${process.env.REACT_APP_LIBRARY_API_URL}/authors/${publicSpaceId}/quiz-submissions`, {
      params: { page, limit },
    });

  return {
    ...data,
    data: data.data.map(({ quizTitle, ...submission }) => ({
      ...submission,
      title: quizTitle,
    })),
  };
};
