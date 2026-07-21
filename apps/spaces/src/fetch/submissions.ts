export type SubmissionStatus = "In review" | "Accepted" | "Rejected";

export interface QuizSubmissionDto {
  id: string;
  name: string;
  submittedOn: string;
  status: SubmissionStatus;
}

export interface QuestionSubmissionDto {
  id: string;
  name: string;
  type: string;
  app: string;
  submittedOn: string;
  status: SubmissionStatus;
}

const mockQuizSubmissions: QuizSubmissionDto[] = [
  { id: "quiz-submission-1", name: "HR email quiz", submittedOn: "21 July 2026", status: "In review" },
  { id: "quiz-submission-2", name: "Annual compliance quiz", submittedOn: "21 July 2026", status: "In review" },
  { id: "quiz-submission-3", name: "Email quiz for healthcare providers", submittedOn: "3 July 2026", status: "Rejected" },
  { id: "quiz-submission-4", name: "Hospital communication quiz", submittedOn: "1 July 2026", status: "Accepted" },
  { id: "quiz-submission-5", name: "Hospital communication follow-up", submittedOn: "27 June 2026", status: "Rejected" },
  { id: "quiz-submission-6", name: "Official Gmail questions", submittedOn: "27 June 2026", status: "Accepted" },
  { id: "quiz-submission-7", name: "Official Facebook emails", submittedOn: "27 June 2026", status: "Accepted" },
  { id: "quiz-submission-8", name: "Slack security reminders", submittedOn: "24 June 2026", status: "In review" },
  { id: "quiz-submission-9", name: "Microsoft Teams phishing drill", submittedOn: "22 June 2026", status: "Accepted" },
  { id: "quiz-submission-10", name: "Payroll verification quiz", submittedOn: "20 June 2026", status: "Rejected" },
  { id: "quiz-submission-11", name: "Travel policy awareness quiz", submittedOn: "18 June 2026", status: "Accepted" },
  { id: "quiz-submission-12", name: "Executive impersonation quiz", submittedOn: "17 June 2026", status: "In review" },
  { id: "quiz-submission-13", name: "Password reset scam quiz", submittedOn: "15 June 2026", status: "Accepted" },
  { id: "quiz-submission-14", name: "Benefits enrollment quiz", submittedOn: "13 June 2026", status: "Accepted" },
  { id: "quiz-submission-15", name: "Shared drive access quiz", submittedOn: "11 June 2026", status: "Rejected" },
  { id: "quiz-submission-16", name: "Vendor invoice fraud quiz", submittedOn: "9 June 2026", status: "In review" },
  { id: "quiz-submission-17", name: "Remote onboarding quiz", submittedOn: "8 June 2026", status: "Accepted" },
  { id: "quiz-submission-18", name: "Account recovery quiz", submittedOn: "6 June 2026", status: "Accepted" },
  { id: "quiz-submission-19", name: "Cloud storage sharing quiz", submittedOn: "3 June 2026", status: "Rejected" },
  { id: "quiz-submission-20", name: "SMS verification quiz", submittedOn: "1 June 2026", status: "Accepted" },
  { id: "quiz-submission-21", name: "Finance approvals quiz", submittedOn: "30 May 2026", status: "In review" },
  { id: "quiz-submission-22", name: "Customer support handoff quiz", submittedOn: "28 May 2026", status: "Accepted" },
  { id: "quiz-submission-23", name: "Internal memo quiz", submittedOn: "25 May 2026", status: "Rejected" },
];

const mockQuestionSubmissions: QuestionSubmissionDto[] = [
  { id: "question-submission-1", name: "First date message", type: "Message", app: "WhatsApp", submittedOn: "21 July 2026", status: "In review" },
  { id: "question-submission-2", name: "Bank of America email", type: "Email", app: "Bank of America", submittedOn: "21 July 2026", status: "In review" },
  { id: "question-submission-3", name: "Befriending message", type: "Message", app: "Instagram", submittedOn: "21 July 2026", status: "In review" },
  { id: "question-submission-4", name: "Software update email", type: "Email", app: "Microsoft", submittedOn: "21 July 2026", status: "In review" },
  { id: "question-submission-5", name: "Post office SMS", type: "SMS", app: "Post Office", submittedOn: "17 July 2026", status: "Accepted" },
  { id: "question-submission-6", name: "Delivery notification Whatsapp", type: "Message", app: "WhatsApp", submittedOn: "17 July 2026", status: "Accepted" },
  { id: "question-submission-7", name: "Parcel pickup message", type: "Message", app: "Messenger", submittedOn: "17 July 2026", status: "Accepted" },
  { id: "question-submission-8", name: "Password reset notice", type: "Email", app: "Google", submittedOn: "15 July 2026", status: "Rejected" },
  { id: "question-submission-9", name: "Benefits enrollment email", type: "Email", app: "Outlook", submittedOn: "14 July 2026", status: "In review" },
  { id: "question-submission-10", name: "Cloud sharing alert", type: "Email", app: "Google Drive", submittedOn: "13 July 2026", status: "Accepted" },
  { id: "question-submission-11", name: "Payroll correction email", type: "Email", app: "Outlook", submittedOn: "12 July 2026", status: "Rejected" },
  { id: "question-submission-12", name: "Voice note follow-up", type: "Voicemail", app: "Teams", submittedOn: "11 July 2026", status: "Accepted" },
  { id: "question-submission-13", name: "New secure login page", type: "Landing page", app: "Okta", submittedOn: "10 July 2026", status: "Accepted" },
  { id: "question-submission-14", name: "Calendar invite reminder", type: "Calendar", app: "Google Calendar", submittedOn: "9 July 2026", status: "In review" },
  { id: "question-submission-15", name: "Insurance renewal email", type: "Email", app: "Gmail", submittedOn: "8 July 2026", status: "Accepted" },
  { id: "question-submission-16", name: "Account verification text", type: "SMS", app: "WhatsApp", submittedOn: "7 July 2026", status: "Rejected" },
  { id: "question-submission-17", name: "Package customs notice", type: "Email", app: "DHL", submittedOn: "6 July 2026", status: "Accepted" },
  { id: "question-submission-18", name: "Invoice approval request", type: "Email", app: "Outlook", submittedOn: "5 July 2026", status: "In review" },
  { id: "question-submission-19", name: "Dropbox document share", type: "Email", app: "Dropbox", submittedOn: "4 July 2026", status: "Accepted" },
  { id: "question-submission-20", name: "Courier failed attempt SMS", type: "SMS", app: "Post Office", submittedOn: "3 July 2026", status: "Accepted" },
  { id: "question-submission-21", name: "Security callback message", type: "Message", app: "Telegram", submittedOn: "2 July 2026", status: "Rejected" },
  { id: "question-submission-22", name: "Bank transfer warning", type: "Email", app: "Banking", submittedOn: "1 July 2026", status: "Accepted" },
  { id: "question-submission-23", name: "Unexpected MFA prompt", type: "Push", app: "Okta", submittedOn: "27 June 2026", status: "In review" },
];

export const getQuizSubmissions = async (): Promise<QuizSubmissionDto[]> => (
  mockQuizSubmissions
);

export const getQuestionSubmissions = async (): Promise<QuestionSubmissionDto[]> => (
  mockQuestionSubmissions
);
