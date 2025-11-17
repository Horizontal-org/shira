import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AssignLearnerDto } from "../dto/assign.learner.dto";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { LearnerQuiz as LearnerQuizEntity } from "../domain/learners_quizzes.entity";
import { IAssignLearnerService } from "../interfaces/services/assign.learner.service.interface";
import { NotFoundLearnerException } from "../exceptions";
import { AssignToQuizException } from "../exceptions/quiz-learner.exceptions";

@Injectable()
export class AssignLearnerService implements IAssignLearnerService {
  constructor(
    @InjectRepository(LearnerEntity)
    private learnerRepo: Repository<LearnerEntity>,
    @InjectRepository(LearnerQuizEntity)
    private learnerQuizRepo: Repository<LearnerQuizEntity>
  ) { }

  async assign(assignLearnerDto: AssignLearnerDto): Promise<void> {
    const { email, spaceId, quizId } = assignLearnerDto;

    console.debug("AssignLearnerService ~ assign ~ email:", email, "spaceId:", spaceId);

    const learner = await this.learnerRepo.findOne({
      where: {
        email,
        space: { id: spaceId }
      }
    });

    if (!learner) throw new NotFoundLearnerException();

    const learnerQuiz = this.learnerQuizRepo.create({
      learnerId: learner.id,
      quizId,
      status: 'assigned',
      assignedAt: new Date(),
    });

    try {
      await this.learnerQuizRepo.save(learnerQuiz);
    } catch (err) {
      console.error('AssignLearnerService ~ error assigning quiz to learner', { email, spaceId, quizId, err });
      throw new AssignToQuizException();
    }
  }
}
