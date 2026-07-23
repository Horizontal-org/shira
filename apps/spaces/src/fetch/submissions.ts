export type SubmissionStatus = "in_review" | "accepted" | "rejected";

export interface QuizSubmissionDto {
  id: string;
  title: string;
  dateSubmitted: string;
  status: SubmissionStatus;
  reason?: string;
  questions: QuestionSubmissionDto[];
}

export interface LanguageTagDto {
  id: number;
  name: string;
  code: string;
}

export interface QuizSubmissionDetailDto extends QuizSubmissionDto {
  description: string;
  langTags: LanguageTagDto[];
  tags?: string[];
  questions: QuestionSubmissionDetailDto[];
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
  {
    id: "1",
    title: "HR email quiz",
    dateSubmitted: "2026-07-21",
    status: "in_review",
    questions: [
      { id: "1", questionName: "Anti-virus marketing", dateSubmitted: "2026-07-21", status: "in_review" },
      { id: "4", questionName: "Payroll portal reminder", dateSubmitted: "2026-07-21", status: "in_review" },
    ],
  },
  {
    id: "2",
    title: "Hospital communication quiz",
    dateSubmitted: "2026-07-01",
    status: "accepted",
    questions: [
      { id: "2", questionName: "Communication question", dateSubmitted: "2026-07-01", status: "accepted" },
      { id: "5", questionName: "Patient-visiting update", dateSubmitted: "2026-07-01", status: "accepted" },
    ],
  },
  {
    id: "3",
    title: "Email quiz for healthcare providers",
    dateSubmitted: "2026-07-03",
    status: "rejected",
    reason: "there are some typos",
    questions: [
      { id: "3", questionName: "Question for healthcare providers", dateSubmitted: "2026-07-03", status: "rejected", reason: "does not apply" },
      { id: "6", questionName: "Clinical-system access request", dateSubmitted: "2026-07-03", status: "rejected", reason: "does not apply" },
    ],
  },
];

const mockQuestionSubmissionDetails: Record<string, QuestionSubmissionDetailDto> = {
  "1": {
    id: "1",
    questionName: "Anti-virus marketing",
    appType: "messaging",
    app: "SMS",
    language: "English",
    isPhishing: true,
    tags: ["anti-virus", "malicious links"],
    content: "<div><div id=\"required-content\"><span data-explanation=\"1\" id=\"component-required-phone\">Security Update</span></div><div id=\"optional-content\"></div><div id=\"dynamic-content\"><div data-position=\"0\" id=\"component-text-1\"><p>Your anti-virus subscription has expired. <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://security-update.example\"><mark data-explanation=\"2\">Renew it now</mark></a>.</p></div></div></div>",
    explanations: [
      { position: "1", text: "Unexpected security alerts should be verified through your usual anti-virus provider.", index: "1" },
      { position: "2", text: "Avoid renewal links in unsolicited messages; open the provider's official site directly instead.", index: "2" },
    ],
    dateSubmitted: "2026-07-21",
    status: "in_review",
  },
  "2": {
    id: "2",
    questionName: "Communication question",
    appType: "email",
    app: "Gmail",
    language: "English",
    isPhishing: false,
    tags: ["hospital", "communication"],
    content: "<div><div id=\"required-content\"></div><div id=\"optional-content\"></div><div id=\"dynamic-content\"><div data-position=\"0\" id=\"component-text-1\"><p><span data-explanation=\"1\">Hospital Communications</span>: The staff meeting has moved to Friday at 10:00 AM in Conference Room B.</p></div></div></div>",
    explanations: [
      { position: "1", text: "This message identifies a known internal sender and provides a routine scheduling update.", index: "1" },
    ],
    dateSubmitted: "2026-07-01",
    status: "accepted",
  },
  "3": {
    id: "3",
    questionName: "Question for healthcare providers",
    appType: "email",
    app: "Gmail",
    language: "English",
    isPhishing: true,
    tags: ["healthcare", "credential theft"],
    content: "<div><div id=\"required-content\"></div><div id=\"optional-content\"></div><div id=\"dynamic-content\"><div data-position=\"0\" id=\"component-text-1\"><p>Your medical account requires verification. <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://medical-account.example\"><mark data-explanation=\"1\">Sign in to keep access</mark></a>.</p></div></div></div>",
    explanations: [
      { position: "1", text: "The message uses urgency and a sign-in request to try to capture account credentials.", index: "1" },
    ],
    dateSubmitted: "2026-07-03",
    status: "rejected",
    reason: "does not apply",
  },
  "4": {
    id: "4",
    questionName: "Payroll portal reminder",
    appType: "email",
    app: "Outlook",
    language: "English",
    isPhishing: true,
    tags: ["payroll", "credential theft"],
    content: "<div><div id=\"required-content\"></div><div id=\"optional-content\"></div><div id=\"dynamic-content\"><div data-position=\"0\" id=\"component-text-1\"><p>Your payroll account has been locked. <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://payroll-reset.example\"><mark data-explanation=\"1\">Reset your password</mark></a> to restore access.</p></div></div></div>",
    explanations: [
      { position: "1", text: "Payroll credentials are valuable; verify account warnings through the company portal, not the email link.", index: "1" },
    ],
    dateSubmitted: "2026-07-21",
    status: "in_review",
  },
  "5": {
    id: "5",
    questionName: "Patient-visiting update",
    appType: "messaging",
    app: "WhatsApp",
    language: "English",
    isPhishing: false,
    tags: ["hospital", "patient care"],
    content: "<div><div id=\"required-content\"></div><div id=\"optional-content\"></div><div id=\"dynamic-content\"><div data-position=\"0\" id=\"component-text-1\"><p><span data-explanation=\"1\">Ward coordinator</span>: Visiting hours for the recovery ward are 2:00 PM to 6:00 PM today.</p></div></div></div>",
    explanations: [
      { position: "1", text: "This is a routine update from an identified hospital role and contains no request for personal information.", index: "1" },
    ],
    dateSubmitted: "2026-07-01",
    status: "accepted",
  },
  "6": {
    id: "6",
    questionName: "Clinical-system access request",
    appType: "email",
    app: "Gmail",
    language: "English",
    isPhishing: true,
    tags: ["healthcare", "credential theft"],
    content: "<div><div id=\"required-content\"></div><div id=\"optional-content\"></div><div id=\"dynamic-content\"><div data-position=\"0\" id=\"component-text-1\"><p>Your clinical-system session expires today. <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://clinical-access.example\"><mark data-explanation=\"1\">Confirm your login</mark></a> to avoid suspension.</p></div></div></div>",
    explanations: [
      { position: "1", text: "Urgency and a login confirmation request are common phishing signals. Access the clinical system through its normal address.", index: "1" },
    ],
    dateSubmitted: "2026-07-03",
    status: "rejected",
    reason: "does not apply",
  },
};

const mockQuizSubmissionDetails: Record<string, QuizSubmissionDetailDto> = {
  "1": {
    id: "1",
    title: "HR email quiz",
    description: "Recognizing suspicious security notices sent by email and SMS.",
    langTags: [{ id: 4, name: "English", code: "en" }],
    tags: ["anti-virus", "malicious links"],
    questions: [mockQuestionSubmissionDetails["1"], mockQuestionSubmissionDetails["4"]],
    dateSubmitted: "2026-07-21",
    status: "in_review",
  },
  "2": {
    id: "2",
    title: "Hospital communication quiz",
    description: "Routine hospital communication scenarios for staff.",
    langTags: [{ id: 4, name: "English", code: "en" }],
    tags: ["hospital", "communication"],
    questions: [mockQuestionSubmissionDetails["2"], mockQuestionSubmissionDetails["5"]],
    dateSubmitted: "2026-07-01",
    status: "accepted",
  },
  "3": {
    id: "3",
    title: "Email quiz for healthcare providers",
    description: "Email phishing attempts targeted towards doctors, nurses and medical professionals.",
    langTags: [{ id: 4, name: "English", code: "en" }],
    tags: ["actual scams", "malicious links", "healthcare"],
    questions: [mockQuestionSubmissionDetails["3"], mockQuestionSubmissionDetails["6"]],
    dateSubmitted: "2026-07-03",
    status: "rejected",
    reason: "there are some typos",
  },
};

export const getQuizSubmissions = async (): Promise<QuizSubmissionDto[]> =>
  mockQuizSubmissions;

export const getQuizSubmission = async (id: string): Promise<QuizSubmissionDetailDto> => {
  return mockQuizSubmissionDetails[id];
};

export const getQuestionSubmission = async (id: string): Promise<QuestionSubmissionDetailDto> => {
  return mockQuestionSubmissionDetails[id];
};
