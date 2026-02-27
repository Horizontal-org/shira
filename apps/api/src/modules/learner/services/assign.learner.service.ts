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
import { ApiLogger } from "src/utils/logger/api-logger.service";
import { InjectRepository } from "@nestjs/typeorm";
import { OrganizationEntity } from "src/modules/organization/domain/organization.entity";
import { Quiz as QuizEntity } from "src/modules/quiz/domain/quiz.entity";

@Injectable()
export class AssignLearnerService implements IAssignLearnerService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepo: Repository<OrganizationEntity>,
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
    @InjectQueue("emails")
    private readonly emailsQueue: Queue
  ) { }

  private readonly logger = new ApiLogger(AssignLearnerService.name);

  async assign(assignLearnerDto: AssignLearnerDto, spaceId: number): Promise<void> {
    const { learners } = assignLearnerDto;

    this.logger.log(`Assigning ${learners.length} learners to quizzes in space ${spaceId}`);

    const { organizationName, quizTitle } = await this.fetchOrganizationAndQuizTitle(spaceId, learners);

    this.logger.log(`Fetched organization ${organizationName} and quiz title ${quizTitle}`);

    await this.dataSource.transaction(async (manager) => {
      const learnerRepo = manager.getRepository(LearnerEntity);
      const learnerQuizRepo = manager.getRepository(LearnerQuizEntity);

      const existingLearners = await this.fetchLearnersByIds(learners, learnerRepo, spaceId);
      const learnersById = new Map(existingLearners.map(learner => [learner.id, learner]));

      const assignments = this.prepareQuizAssignments(learners, learnersById, learnerQuizRepo);
      const savedAssignments = await learnerQuizRepo.save(assignments);

      await this.sendEmails(savedAssignments, learnersById, organizationName, quizTitle);

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
    learnersById: Map<number, LearnerEntity>,
    organization: string,
    quizTitle: string
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
            subject: `${organization} invited you to take the quiz "${quizTitle}" in Shira`,
            template: "learner-quiz-assignment",
            data: { email, magicLink, organization, quizTitle }
          });
        } catch (error) {
          this.logger.error(`Failed to send email to ${email} for quiz assignment: ${error.message}`);
          throw new QuizAssignmentFailedException();
        }
      })
    );
  }

  private async fetchOrganizationAndQuizTitle(spaceId: number, learners: LearnerToBeAssigned[]) {
    const organizationName = await this.organizationRepo
      .createQueryBuilder('organization')
      .innerJoin('organization.spaces', 'space')
      .where('space.id = :spaceId', { spaceId })
      .select(['organization.name'])
      .getOne()
      .then(org => org.name);

    const quizTitle = await this.quizRepo
      .createQueryBuilder('quiz')
      .where('quiz.id = :quizId', { quizId: learners[0].quizId })
      .select(['quiz.title'])
      .getOne()
      .then(quiz => quiz.title);

    return { organizationName, quizTitle };
  }
}
