import { GenerateUrlsQuestionImageDto } from "../../dto/generate_urls.question_image.dto";
import { ReadQuestionImageDto } from "../../dto/read.question_image.dto";

export interface IGenerateUrlsQuestionImageService {
  byQuiz(quizId: number): Promise<ReadQuestionImageDto>;
  byQuestion(questionId: number): Promise<ReadQuestionImageDto>;
}
