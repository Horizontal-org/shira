import axios from "axios";
import {
  mapQuestionSubmissionDetail,
  mapQuizSubmissionDetail,
  type LibraryQuestionTemplateDto,
  type LibraryQuizQuestionDto,
  type LibraryQuizTemplateDto,
} from "./submissionMappers";

export const DEFAULT_SUBMISSIONS_PAGE_LIMIT = 20;
export type SubmissionStatus = "in_review" | "accepted" | "rejected";

export interface QuizSubmissionDto {
  id: string;
  resourceId: string;
  resourceType: "quiz_template";
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
  resourceId: string;
  resourceType: "question_template";
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

export interface PublishQuizSubmissionPayload {
  spaceDisplayName: string;
  langTagIds?: number[];
  tagIds?: number[];
}

export const publishQuizSubmission = async (quizId: number, payload: PublishQuizSubmissionPayload)
  : Promise<void> => {
  await axios.post(
    `${process.env.REACT_APP_API_URL}/library/quiz/${quizId}/publish`,
    payload,
  );
};

export const publishQuestionSubmission = async (questionId: number, payload: PublishQuizSubmissionPayload)
  : Promise<void> => {
  await axios.post(
    `${process.env.REACT_APP_API_URL}/library/question/${questionId}/publish`,
    payload,
  );
};

export const getQuestionSubmissionDetail = async (submission: QuestionSubmissionDto)
  : Promise<QuestionSubmissionDetailDto> => {
  const { data } = await axios.get<LibraryQuestionTemplateDto>(
    `${process.env.REACT_APP_LIBRARY_API_URL}/question-templates/${submission.resourceId}`,
  );

  return mapQuestionSubmissionDetail(submission, data);
};

export const getQuizSubmissionDetail = async (
  submission: QuizSubmissionDto
): Promise<QuizSubmissionDetailDto> => {
  const [quizResponse, questionsResponse] = await Promise.all([
    axios.get<LibraryQuizTemplateDto>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates/${submission.resourceId}`,
    ),
    axios.get<LibraryQuizQuestionDto[]>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates/${submission.resourceId}/questions`,
    ),
  ]);

  return mapQuizSubmissionDetail(
    submission,
    quizResponse.data,
    questionsResponse.data,
  );
};

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
