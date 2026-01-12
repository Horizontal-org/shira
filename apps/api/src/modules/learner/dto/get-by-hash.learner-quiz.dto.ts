export class GetByHashLearnerQuizDto {
  learnerQuiz: {
    learnerEmail: string;
    learnerName: string;
    learnerId: number;
    status: string;
  }
  quiz: Object
}