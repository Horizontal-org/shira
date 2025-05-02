
export interface IValidateSpaceQuizService {
  execute(spaceId: number, quizId: number): Promise<void>;
}
