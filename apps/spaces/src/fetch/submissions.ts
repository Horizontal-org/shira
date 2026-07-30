import axios from "axios";

export const DEFAULT_PAGE_LIMIT = 20;
export type SubmissionStatus = "in_review" | "approved" | "rejected";

export interface QuizSubmissionDto {
  id: string;
  resourceId: string;
  resourceType: "quiz_template";
  quizTitle: string;
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

export interface PublishSubmissionPayload {
  spaceDisplayName: string;
  langTagIds?: number[];
  tagIds?: number[];
}

interface QuizSubmissionApiDto {
  id: string;
  quizTitle: string;
  dateSubmitted: string;
  status: SubmissionStatus;
  reason?: string;
}

type LibraryQuestionTemplateDto = {
  id: number;
  name: string;
  isPhishing: boolean;
  content: string;
  appType: string;
  defaultApp: string | null;
  langTags: LanguageTagDto[];
  tags: { name: string }[];
  explanations: { position: string; positionIndex: string; content: string }[];
};

type LibraryQuizTemplateDto = {
  id: number;
  title: string;
  langTags: LanguageTagDto[];
  tags: { name: string }[];
};

type LibraryQuizQuestionDto = {
  questionId: number;
  questionName: string;
  isPhishing: boolean;
  language: string | null;
  appName: string | null;
  appType: string;
  content: string;
  explanations: QuestionSubmissionExplanationDto[];
};

export const publishQuizSubmission = async (
  quizId: number,
  payload: PublishSubmissionPayload,
): Promise<void> => {
  await axios.post(
    `${process.env.REACT_APP_API_URL}/library/quiz/${quizId}/publish`,
    payload,
  );
};

export const publishQuestionSubmission = async (
  questionId: number,
  payload: PublishSubmissionPayload,
): Promise<void> => {
  await axios.post(
    `${process.env.REACT_APP_API_URL}/library/question/${questionId}/publish`,
    payload,
  );
};

export const getQuestionSubmissionDetail = async (
  submission: QuestionSubmissionDto,
): Promise<QuestionSubmissionDetailDto> => {
  const { data } = await axios.get<LibraryQuestionTemplateDto>(
    `${process.env.REACT_APP_LIBRARY_API_URL}/question-templates/${submission.resourceId}`,
  );

  return {
    ...submission,
    id: String(data.id),
    questionName: data.name,
    appType: data.appType,
    app: data.defaultApp ?? "",
    language: data.langTags[0]?.name ?? "",
    isPhishing: data.isPhishing,
    tags: data.tags.map((tag) => tag.name),
    content: data.content,
    explanations: data.explanations.map((explanation) => ({
      position: explanation.position,
      index: explanation.positionIndex,
      text: explanation.content,
    })),
  };
};

export const getQuizSubmissionDetail = async (
  submission: QuizSubmissionDto,
): Promise<QuizSubmissionDetailDto> => {
  const [quizResponse, questionsResponse] = await Promise.all([
    axios.get<LibraryQuizTemplateDto>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates/${submission.resourceId}`,
    ),
    axios.get<LibraryQuizQuestionDto[]>(
      `${process.env.REACT_APP_LIBRARY_API_URL}/quiz-templates/${submission.resourceId}/questions`,
    ),
  ]);

  return {
    ...submission,
    id: String(quizResponse.data.id),
    quizTitle: quizResponse.data.title,
    description: "",
    langTags: quizResponse.data.langTags,
    tags: quizResponse.data.tags.map((tag) => tag.name),
    questions: questionsResponse.data.map((question) => ({
      id: String(question.questionId),
      resourceId: String(question.questionId),
      resourceType: "question_template",
      questionName: question.questionName,
      dateSubmitted: submission.dateSubmitted,
      status: submission.status,
      reason: submission.reason,
      appType: question.appType,
      app: question.appName ?? "",
      language: question.language ?? quizResponse.data.langTags[0]?.name ?? "",
      isPhishing: question.isPhishing,
      tags: quizResponse.data.tags.map((tag) => tag.name),
      content: question.content,
      explanations: question.explanations,
    })),
  };
};

export const getQuestionSubmissions = async (
  publicSpaceId: string,
  {
    page = 1,
    limit = DEFAULT_PAGE_LIMIT,
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
    limit = DEFAULT_PAGE_LIMIT,
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
      quizTitle,
    })),
  };
};
