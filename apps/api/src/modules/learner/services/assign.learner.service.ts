import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AssignLearnerDto } from "../dto/assign.learner.dto";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { LearnerQuiz as LearnerQuizEntity } from "../domain/learners_quizzes.entity";
import { IAssignLearnerService } from "../interfaces/services/assign.learner.service.interface";

@Injectable()
export class AssignLearnerService implements IAssignLearnerService {
  constructor(
    @InjectRepository(LearnerEntity)
    private learnerRepo: Repository<LearnerEntity>,
    @InjectRepository(LearnerQuizEntity)
    private learnerQuizRepo: Repository<LearnerQuizEntity>
  ) { }

  async execute(assignLearnerDto: AssignLearnerDto): Promise<void> {
    console.log("🚀 ~ AssignLearnerService ~ execute ~ assignLearnerDto:", assignLearnerDto);

    const { email, spaceId, quizId } = assignLearnerDto;

    const learner = await this.learnerRepo.findOne({
      where: {
        email,
        space: { id: spaceId }
      }
    });

    if (!learner) { throw new Error('Learner not found in this space'); }

    const learnerQuiz = this.learnerQuizRepo.create({
      learnerId: learner.id,
      quizId,
      status: 'assigned',
      assignedAt: new Date(),
    });

    await this.learnerQuizRepo.save(learnerQuiz);
  }
}