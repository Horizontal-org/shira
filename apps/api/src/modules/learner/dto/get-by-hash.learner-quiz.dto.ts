import { Learner } from "../domain/learner.entity";

export class GetByHashLearnerQuizDto {
  learner: Learner
  quiz: Object
}