export type QuizResults = {
  quiz: {
    id: number;
    title: string;
    totalQuestions: number;
  };
  metrics: {
    completedCount: number;
    averageScore: number;
  };
};
