export class LearnerOperationResponse {
  email: string;
  quizId: number;
  status: Status;
  message?: string;
};

type Status = 'OK' | 'Error';