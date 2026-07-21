export type SubmissionStatus = "In review" | "Accepted" | "Rejected";

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
  { id: "quiz-submission-1", name: "HR email quiz", dateSubmitted: "21 July 2026", status: "In review" },
  { id: "quiz-submission-2", name: "Annual compliance quiz", dateSubmitted: "21 July 2026", status: "In review" },
  { id: "quiz-submission-3", name: "Email quiz for healthcare providers", dateSubmitted: "3 July 2026", status: "Rejected" },
  { id: "quiz-submission-4", name: "Hospital communication quiz", dateSubmitted: "1 July 2026", status: "Accepted" },
  { id: "quiz-submission-5", name: "Hospital communication follow-up", dateSubmitted: "27 June 2026", status: "Rejected" },
  { id: "quiz-submission-6", name: "Official Gmail questions", dateSubmitted: "27 June 2026", status: "Accepted" },
  { id: "quiz-submission-7", name: "Official Facebook emails", dateSubmitted: "27 June 2026", status: "Accepted" },
  { id: "quiz-submission-8", name: "Slack security reminders", dateSubmitted: "24 June 2026", status: "In review" },
  { id: "quiz-submission-9", name: "Microsoft Teams phishing drill", dateSubmitted: "22 June 2026", status: "Accepted" },
  { id: "quiz-submission-10", name: "Payroll verification quiz", dateSubmitted: "20 June 2026", status: "Rejected" },
  { id: "quiz-submission-11", name: "Travel policy awareness quiz", dateSubmitted: "18 June 2026", status: "Accepted" },
  { id: "quiz-submission-12", name: "Executive impersonation quiz", dateSubmitted: "17 June 2026", status: "In review" },
  { id: "quiz-submission-13", name: "Password reset scam quiz", dateSubmitted: "15 June 2026", status: "Accepted" },
  { id: "quiz-submission-14", name: "Benefits enrollment quiz", dateSubmitted: "13 June 2026", status: "Accepted" },
  { id: "quiz-submission-15", name: "Shared drive access quiz", dateSubmitted: "11 June 2026", status: "Rejected" },
  { id: "quiz-submission-16", name: "Vendor invoice fraud quiz", dateSubmitted: "9 June 2026", status: "In review" },
  { id: "quiz-submission-17", name: "Remote onboarding quiz", dateSubmitted: "8 June 2026", status: "Accepted" },
  { id: "quiz-submission-18", name: "Account recovery quiz", dateSubmitted: "6 June 2026", status: "Accepted" },
  { id: "quiz-submission-19", name: "Cloud storage sharing quiz", dateSubmitted: "3 June 2026", status: "Rejected" },
  { id: "quiz-submission-20", name: "SMS verification quiz", dateSubmitted: "1 June 2026", status: "Accepted" },
  { id: "quiz-submission-21", name: "Finance approvals quiz", dateSubmitted: "30 May 2026", status: "In review" },
  { id: "quiz-submission-22", name: "Customer support handoff quiz", dateSubmitted: "28 May 2026", status: "Accepted" },
  { id: "quiz-submission-23", name: "Internal memo quiz", dateSubmitted: "25 May 2026", status: "Rejected" },
];

const mockQuestionSubmissions: QuestionSubmissionDto[] = [
  { id: "question-submission-1", name: "First date message", type: "Message", app: "WhatsApp", dateSubmitted: "21 July 2026", status: "In review" },
  { id: "question-submission-2", name: "Bank of America email", type: "Email", app: "Bank of America", dateSubmitted: "21 July 2026", status: "In review" },
  { id: "question-submission-3", name: "Befriending message", type: "Message", app: "Instagram", dateSubmitted: "21 July 2026", status: "In review" },
  { id: "question-submission-4", name: "Software update email", type: "Email", app: "Microsoft", dateSubmitted: "21 July 2026", status: "In review" },
  { id: "question-submission-5", name: "Post office SMS", type: "SMS", app: "Post Office", dateSubmitted: "17 July 2026", status: "Accepted" },
  { id: "question-submission-6", name: "Delivery notification Whatsapp", type: "Message", app: "WhatsApp", dateSubmitted: "17 July 2026", status: "Accepted" },
  { id: "question-submission-7", name: "Parcel pickup message", type: "Message", app: "Messenger", dateSubmitted: "17 July 2026", status: "Accepted" },
  { id: "question-submission-8", name: "Password reset notice", type: "Email", app: "Google", dateSubmitted: "15 July 2026", status: "Rejected" },
  { id: "question-submission-9", name: "Benefits enrollment email", type: "Email", app: "Outlook", dateSubmitted: "14 July 2026", status: "In review" },
  { id: "question-submission-10", name: "Cloud sharing alert", type: "Email", app: "Google Drive", dateSubmitted: "13 July 2026", status: "Accepted" },
  { id: "question-submission-11", name: "Payroll correction email", type: "Email", app: "Outlook", dateSubmitted: "12 July 2026", status: "Rejected" },
  { id: "question-submission-12", name: "Voice note follow-up", type: "Voicemail", app: "Teams", dateSubmitted: "11 July 2026", status: "Accepted" },
  { id: "question-submission-13", name: "New secure login page", type: "Landing page", app: "Okta", dateSubmitted: "10 July 2026", status: "Accepted" },
  { id: "question-submission-14", name: "Calendar invite reminder", type: "Calendar", app: "Google Calendar", dateSubmitted: "9 July 2026", status: "In review" },
  { id: "question-submission-15", name: "Insurance renewal email", type: "Email", app: "Gmail", dateSubmitted: "8 July 2026", status: "Accepted" },
  { id: "question-submission-16", name: "Account verification text", type: "SMS", app: "WhatsApp", dateSubmitted: "7 July 2026", status: "Rejected" },
];

export const getQuizSubmissions = async (): Promise<QuizSubmissionDto[]> => (
  mockQuizSubmissions
);

export const getQuestionSubmissions = async (): Promise<QuestionSubmissionDto[]> => (
  mockQuestionSubmissions
);
