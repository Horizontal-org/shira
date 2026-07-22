export type SubmissionStatus = "in_review" | "accepted" | "rejected";

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

export interface QuizSubmissionQuestionDto {
  questionId: number;
  questionName: string;
  isPhishing: boolean;
  language: string;
  appName: string;
  appType: string;
}

export interface QuizSubmissionDetailDto extends QuizSubmissionDto {
  description: string;
  langTags: LanguageTagDto[];
  tags?: string[];
  questions: QuizSubmissionQuestionDto[];
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

const mockQuizSubmissions: QuizSubmissionDto[] = [
  { id: "1", title: "HR email quiz", dateSubmitted: "2026-07-21", status: "in_review" },
  { id: "2", title: "Hospital communication quiz", dateSubmitted: "2026-07-01", status: "accepted" },
  { id: "3", title: "Email quiz for healthcare providers", dateSubmitted: "2026-07-03", status: "rejected", reason: "there are some typos" },
];

const mockQuizSubmissionDetails: Record<string, QuizSubmissionDetailDto> = {
  "1": {
    id: "1",
    title: "Email quiz for healthcare providers",
    description: "Email phishing attempts targeted towards doctors, nurses and medical professionals.",
    langTags: [{ id: 4, name: "English", code: "en" }],
    tags: ["actual scams", "malicious links", "healthcare"],
    questions: [{ questionId: 1, questionName: "Anti-virus marketing", isPhishing: true, language: "English", appName: "Gmail", appType: "email" }],
    dateSubmitted: "2026-07-03",
    status: "rejected",
    reason: "there are some typos",
  },
};

const mockQuestionSubmissions: QuestionSubmissionDto[] = [
  { id: "1", questionName: "Anti-virus marketing", dateSubmitted: "2026-07-21", status: "in_review" },
  { id: "2", questionName: "Communication question", dateSubmitted: "2026-07-01", status: "accepted" },
  { id: "3", questionName: "Question for healthcare providers", dateSubmitted: "2026-07-03", status: "rejected", reason: "does not apply" },
];

const mockQuestionSubmissionDetails: Record<string, QuestionSubmissionDetailDto> = {
  "1": {
    id: "1",
    questionName: "Post office SMS",
    appType: "messaging",
    app: "SMS",
    language: "English",
    isPhishing: true,
    tags: ["delivery", "malicious links"],
    content: "<div><div id=\"required-content\"><span data-explanation=\"1\" id=\"component-required-phone\">Trinh Nguyen</span></div><div id=\"optional-content\"></div><div id=\"dynamic-content\"><div data-position=\"0\" id=\"component-text-1\"><p>Look what I found... <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://photo.8hh.sbs/oktk2aysp\"><mark data-explanation=\"2\">https://photo.8hh.sbs/oktk2aysp</mark></a></p></div></div></div>",
    explanations: [
      { position: "1", text: "Is this the name of a real friend? If so, do you usually communicate with them over this app, or is this unusual?", index: "1" },
      { position: "2", text: "This link doesn't lead to any known website or platform and should be treated with caution.", index: "2" },
    ],
    dateSubmitted: "2026-07-17",
    status: "accepted",
  },
};

export const getQuizSubmissions = async (): Promise<QuizSubmissionDto[]> =>
  mockQuizSubmissions;

export const getQuizSubmission = async (id: string): Promise<QuizSubmissionDetailDto> => {
  return mockQuizSubmissionDetails[id];
};

export const getQuestionSubmissions = async (): Promise<QuestionSubmissionDto[]> =>
  mockQuestionSubmissions;

export const getQuestionSubmission = async (id: string): Promise<QuestionSubmissionDetailDto> => {
  return mockQuestionSubmissionDetails[id];
};
