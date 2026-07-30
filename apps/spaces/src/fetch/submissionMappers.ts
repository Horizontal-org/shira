import type {
  LanguageTagDto,
  QuestionSubmissionDetailDto,
  QuestionSubmissionDto,
  QuizSubmissionDetailDto,
  QuizSubmissionDto,
} from "./submissions";

export type LibraryQuestionTemplateDto = {
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

export type LibraryQuizTemplateDto = {
  id: number;
  title: string;
  langTags: LanguageTagDto[];
  tags: { name: string }[];
};

export type LibraryQuizQuestionDto = {
  questionId: number;
  questionName: string;
  isPhishing: boolean;
  language: string | null;
  appName: string | null;
  appType: string;
  content: string;
  explanations: { position: string; index: string; text: string }[];
};

export const mapQuestionSubmissionDetail = (submission: QuestionSubmissionDto, question: LibraryQuestionTemplateDto)
  : QuestionSubmissionDetailDto => ({
    ...submission,
    id: String(question.id),
    questionName: question.name,
    appType: question.appType,
    app: question.defaultApp,
    language: question.langTags[0]?.name,
    isPhishing: question.isPhishing,
    tags: question.tags.map((tag) => tag.name),
    content: question.content,
    explanations: question.explanations.map((explanation) => ({
      position: explanation.position,
      index: explanation.positionIndex,
      text: explanation.content,
    })),
  });

const mapQuizQuestionToSubmissionDetail = (question: LibraryQuizQuestionDto, quiz: LibraryQuizTemplateDto, submission: QuizSubmissionDto)
  : QuestionSubmissionDetailDto => ({
    id: String(question.questionId),
    resourceId: String(question.questionId),
    resourceType: "question_template",
    questionName: question.questionName,
    dateSubmitted: submission.dateSubmitted,
    status: submission.status,
    reason: submission.reason,
    appType: question.appType,
    app: question.appName,
    language: question.language ?? quiz.langTags[0]?.name,
    isPhishing: question.isPhishing,
    tags: quiz.tags.map((tag) => tag.name),
    content: question.content,
    explanations: question.explanations,
  });

export const mapQuizSubmissionDetail = (submission: QuizSubmissionDto, quiz: LibraryQuizTemplateDto, questions: LibraryQuizQuestionDto[])
  : QuizSubmissionDetailDto => ({
    ...submission,
    id: String(quiz.id),
    title: quiz.title,
    description: "",
    langTags: quiz.langTags,
    tags: quiz.tags.map((tag) => tag.name),
    questions: questions.map((question) =>
      mapQuizQuestionToSubmissionDetail(question, quiz, submission),
    ),
  });
