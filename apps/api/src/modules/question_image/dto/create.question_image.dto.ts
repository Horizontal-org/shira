export class CreateQuestionImageDto {
  file: Express.Multer.File
  quizId: number;
  questionId?: number;
}
