import { SubmissionListItem } from "../components/MySubmissionsLayout/components/SubmissionsTable";
import type {
  LibraryQuestionTemplateDto,
  LibraryQuizQuestionDto,
  LibraryQuizTemplateDto,
  QuestionSubmissionDto,
  QuestionSubmissionPreviewDto,
  QuizSubmissionDto,
  QuizSubmissionPreviewDto,
  QuizSubmissionQuestionPreviewDto,
  SubmissionExplanationDto,
} from "./submissions";
import {
  translateDefaultLibraryLanguage,
  translateLibraryLanguageTag,
  translateLibraryTag,
} from "../language/libraryTags";

const mapQuestionTemplateExplanation = (
  explanation: LibraryQuestionTemplateDto["explanations"][number],
): SubmissionExplanationDto => ({
  position: explanation.position,
  index: explanation.positionIndex,
  text: explanation.content,
});

export const mapQuestionSubmissionToListItem = (
  submission: QuestionSubmissionDto,
): SubmissionListItem => ({
  resourceId: submission.resourceId,
  name: submission.questionName,
  dateSubmitted: submission.dateSubmitted,
  status: submission.status,
  reason: submission.reason,
});

export const mapQuizSubmissionToListItem = (
  submission: QuizSubmissionDto,
): SubmissionListItem => ({
  resourceId: submission.resourceId,
  name: submission.quizTitle,
  dateSubmitted: submission.dateSubmitted,
  status: submission.status,
  reason: submission.reason,
});

export const mapQuestionSubmissionToPreview = (
  submission: QuestionSubmissionDto,
  template: LibraryQuestionTemplateDto,
): QuestionSubmissionPreviewDto => ({
  ...submission,
  questionName: template.name,
  description: template.description,
  appType: template.appType,
  app: template.defaultApp,
  language: template.langTags[0]
    ? translateLibraryLanguageTag(template.langTags[0].name)
    : translateDefaultLibraryLanguage(),
  isPhishing: template.isPhishing,
  tags: template.tags.map(({ name, slug }) => translateLibraryTag(slug, name)),
  content: template.content,
  explanations: template.explanations.map(mapQuestionTemplateExplanation),
});

const mapQuizQuestionToPreview = (
  question: LibraryQuizQuestionDto,
  fallbackLanguage: string,
  submission: QuizSubmissionDto,
): QuizSubmissionQuestionPreviewDto => ({
  id: String(question.questionId),
  resourceId: String(question.questionId),
  resourceType: "question_template",
  questionName: question.questionName,
  dateSubmitted: submission.dateSubmitted,
  status: submission.status,
  reason: submission.reason,
  appType: question.appType,
  app: question.appName,
  language: question.language
    ? translateLibraryLanguageTag(question.language)
    : fallbackLanguage,
  isPhishing: question.isPhishing,
  content: question.content,
  explanations: question.explanations,
});

export const mapQuizSubmissionToPreview = (
  submission: QuizSubmissionDto,
  template: LibraryQuizTemplateDto,
  questions: LibraryQuizQuestionDto[],
): QuizSubmissionPreviewDto => {
  const fallbackLanguage = template.langTags[0]
    ? translateLibraryLanguageTag(template.langTags[0].name)
    : translateDefaultLibraryLanguage();

  return {
    ...submission,
    quizTitle: template.title,
    description: template.description,
    langTags: template.langTags.map((language) => ({
      ...language,
      name: translateLibraryLanguageTag(language.name),
    })),
    tags: template.tags.map(({ name, slug }) => translateLibraryTag(slug, name)),
    questions: questions.map((question) =>
      mapQuizQuestionToPreview(question, fallbackLanguage, submission),
    ),
  };
};
