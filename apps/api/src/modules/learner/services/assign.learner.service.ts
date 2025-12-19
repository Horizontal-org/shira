import { Injectable } from "@nestjs/common";
import { DataSource, In, Repository } from "typeorm";
import * as crypto from "crypto";
import { AssignLearnerDto, LearnerToBeAssigned } from "../dto/assign.learner.dto";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { LearnerQuiz as LearnerQuizEntity } from "../domain/learners_quizzes.entity";
import { IAssignLearnerService } from "../interfaces/services/assign.learner.service.interface";
import { Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";
import { QuizAssignmentFailedException } from "../exceptions";
import { ApiLogger } from "../logger/api-logger.service";

@Injectable()
export class AssignLearnerService implements IAssignLearnerService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectQueue("emails")
    private readonly emailsQueue: Queue
  ) { }

  private readonly logger = new ApiLogger(AssignLearnerService.name);

  async assign(assignLearnerDto: AssignLearnerDto, spaceId: number): Promise<void> {
    const { learners } = assignLearnerDto;

    this.logger.log(`Assigning ${learners.length} learners to quizzes in space ${spaceId}`);

    await this.dataSource.transaction(async (manager) => {
      const learnerRepo = manager.getRepository(LearnerEntity);
      const learnerQuizRepo = manager.getRepository(LearnerQuizEntity);

      const existingLearners = await this.fetchLearnersByIds(learners, learnerRepo, spaceId);
      const learnersById = new Map(existingLearners.map(learner => [learner.id, learner]));

      const assignments = this.prepareQuizAssignments(learners, learnersById, learnerQuizRepo);
      const savedAssignments = await learnerQuizRepo.save(assignments);

      await this.sendEmails(savedAssignments, learnersById);

      this.logger.log(
        `Successfully assigned ${savedAssignments.length} learners to quizzes in space ${spaceId}`
      );
    });
  }

  private async fetchLearnersByIds(
    learners: LearnerToBeAssigned[],
    learnerRepo: Repository<LearnerEntity>,
    spaceId: number
  ): Promise<LearnerEntity[]> {
    const learnerIds = learners.map(l => l.learnerId);

    const existingLearners = await learnerRepo.find({
      where: {
        id: In(learnerIds),
        space: { id: spaceId }
      }
    });

    return existingLearners;
  }

  private prepareQuizAssignments(
    learners: LearnerToBeAssigned[],
    learnersById: Map<number, LearnerEntity>,
    learnerQuizRepo: Repository<LearnerQuizEntity>
  ): LearnerQuizEntity[] {

    return learners.map(({ learnerId, quizId }) => {
      if (!learnersById.has(learnerId)) {
        throw new QuizAssignmentFailedException(quizId.toString(), learnerId.toString());
      }

      return learnerQuizRepo.create({
        learnerId,
        quizId,
        status: "assigned",
        assignedAt: new Date(),
        hash: crypto.randomBytes(20).toString("hex")
      });
    });
  }

  private async sendEmails(
    savedAssignments: LearnerQuizEntity[],
    learnersById: Map<number, LearnerEntity>
  ) {
    this.logger.log(`Sending quiz assignment emails to learners`);

    await Promise.all(
      savedAssignments.map(async ({ learnerId, hash }) => {
        const learner = learnersById.get(learnerId);

        if (!learner) {
          this.logger.error(`Learner ${learnerId} not found for email sending`);
          throw new QuizAssignmentFailedException();
        }

        const email = learner.email;
        const magicLink = `${process.env.PUBLIC_URL}/learner-quiz/${hash}`;

        try {
          await this.emailsQueue.add("send", {
            to: email,
            from: process.env.SMTP_GLOBAL_FROM,
            subject: "Invitation to take a quiz in a Shira space",
            template: "learner-quiz-assignment",
            data: { email, magicLink }
          });
        } catch {
          this.logger.error(`Failed to send email to ${email} for quiz assignment`);
          throw new QuizAssignmentFailedException();
        }
      })
    );
  }
}
