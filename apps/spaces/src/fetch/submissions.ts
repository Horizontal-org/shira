export type SubmissionStatus = "in_review" | "accepted" | "rejected";

export interface QuizSubmissionDto {
  id: string;
  name: string;
  dateSubmitted: string;
  status: SubmissionStatus;
}

export interface QuestionSubmissionDto {
  id: string;
  name: string;
  type: string;
  app: string;
  dateSubmitted: string;
  status: SubmissionStatus;
}

const mockQuizSubmissions: QuizSubmissionDto[] = [
  { id: "quiz-submission-1", name: "HR email quiz", dateSubmitted: "2026-07-21", status: "in_review" },
  { id: "quiz-submission-2", name: "Annual compliance quiz", dateSubmitted: "2026-07-21", status: "in_review" },
  { id: "quiz-submission-3", name: "Email quiz for healthcare providers", dateSubmitted: "2026-07-03", status: "rejected" },
  { id: "quiz-submission-4", name: "Hospital communication quiz", dateSubmitted: "2026-07-01", status: "accepted" },
  { id: "quiz-submission-5", name: "Hospital communication follow-up", dateSubmitted: "2026-06-27", status: "rejected" },
  { id: "quiz-submission-6", name: "Official Gmail questions", dateSubmitted: "2026-06-27", status: "accepted" },
  { id: "quiz-submission-7", name: "Official Facebook emails", dateSubmitted: "2026-06-27", status: "accepted" },
  { id: "quiz-submission-8", name: "Slack security reminders", dateSubmitted: "2026-06-24", status: "in_review" },
  { id: "quiz-submission-9", name: "Microsoft Teams phishing drill", dateSubmitted: "2026-06-22", status: "accepted" },
  { id: "quiz-submission-10", name: "Payroll verification quiz", dateSubmitted: "2026-06-20", status: "rejected" },
  { id: "quiz-submission-11", name: "Travel policy awareness quiz", dateSubmitted: "2026-06-18", status: "accepted" },
  { id: "quiz-submission-12", name: "Executive impersonation quiz", dateSubmitted: "2026-06-17", status: "in_review" },
  { id: "quiz-submission-13", name: "Password reset scam quiz", dateSubmitted: "2026-06-15", status: "accepted" },
  { id: "quiz-submission-14", name: "Benefits enrollment quiz", dateSubmitted: "2026-06-13", status: "accepted" },
  { id: "quiz-submission-15", name: "Shared drive access quiz", dateSubmitted: "2026-06-11", status: "rejected" },
  { id: "quiz-submission-16", name: "Vendor invoice fraud quiz", dateSubmitted: "2026-06-09", status: "in_review" },
  { id: "quiz-submission-17", name: "Remote onboarding quiz", dateSubmitted: "2026-06-08", status: "accepted" },
  { id: "quiz-submission-18", name: "Account recovery quiz", dateSubmitted: "2026-06-06", status: "accepted" },
  { id: "quiz-submission-19", name: "Cloud storage sharing quiz", dateSubmitted: "2026-06-03", status: "rejected" },
  { id: "quiz-submission-20", name: "SMS verification quiz", dateSubmitted: "2026-06-01", status: "accepted" },
  { id: "quiz-submission-21", name: "Finance approvals quiz", dateSubmitted: "2026-05-30", status: "in_review" },
  { id: "quiz-submission-22", name: "Customer support handoff quiz", dateSubmitted: "2026-05-28", status: "accepted" },
  { id: "quiz-submission-23", name: "Internal memo quiz", dateSubmitted: "2026-05-25", status: "rejected" },
];

const mockQuestionSubmissions: QuestionSubmissionDto[] = [
  { id: "question-submission-1", name: "First date message", type: "Message", app: "WhatsApp", dateSubmitted: "2026-07-21", status: "in_review" },
  { id: "question-submission-2", name: "Bank of America email", type: "Email", app: "Bank of America", dateSubmitted: "2026-07-21", status: "in_review" },
  { id: "question-submission-3", name: "Befriending message", type: "Message", app: "Instagram", dateSubmitted: "2026-07-21", status: "in_review" },
  { id: "question-submission-4", name: "Software update email", type: "Email", app: "Microsoft", dateSubmitted: "2026-07-21", status: "in_review" },
  { id: "question-submission-5", name: "Post office SMS", type: "SMS", app: "Post Office", dateSubmitted: "2026-07-17", status: "accepted" },
  { id: "question-submission-6", name: "Delivery notification Whatsapp", type: "Message", app: "WhatsApp", dateSubmitted: "2026-07-17", status: "accepted" },
  { id: "question-submission-7", name: "Parcel pickup message", type: "Message", app: "Messenger", dateSubmitted: "2026-07-17", status: "accepted" },
  { id: "question-submission-8", name: "Password reset notice", type: "Email", app: "Google", dateSubmitted: "2026-07-15", status: "rejected" },
  { id: "question-submission-9", name: "Benefits enrollment email", type: "Email", app: "Outlook", dateSubmitted: "2026-07-14", status: "in_review" },
  { id: "question-submission-10", name: "Cloud sharing alert", type: "Email", app: "Google Drive", dateSubmitted: "2026-07-13", status: "accepted" },
  { id: "question-submission-11", name: "Payroll correction email", type: "Email", app: "Outlook", dateSubmitted: "2026-07-12", status: "rejected" },
  { id: "question-submission-12", name: "Voice note follow-up", type: "Voicemail", app: "Teams", dateSubmitted: "2026-07-11", status: "accepted" },
  { id: "question-submission-13", name: "New secure login page", type: "Landing page", app: "Okta", dateSubmitted: "2026-07-10", status: "accepted" },
  { id: "question-submission-14", name: "Calendar invite reminder", type: "Calendar", app: "Google Calendar", dateSubmitted: "2026-07-09", status: "in_review" },
  { id: "question-submission-15", name: "Insurance renewal email", type: "Email", app: "Gmail", dateSubmitted: "2026-07-08", status: "accepted" },
  { id: "question-submission-16", name: "Account verification text", type: "SMS", app: "WhatsApp", dateSubmitted: "2026-07-07", status: "rejected" },
];

export const getQuizSubmissions = async (): Promise<QuizSubmissionDto[]> => (
  mockQuizSubmissions
);

export const getQuestionSubmissions = async (): Promise<QuestionSubmissionDto[]> => (
  mockQuestionSubmissions
);
