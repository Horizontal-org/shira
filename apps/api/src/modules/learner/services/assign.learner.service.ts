import { Injectable } from "@nestjs/common";
import { DataSource, In } from "typeorm";
import * as crypto from "crypto";
import { AssignLearnerDto } from "../dto/assign.learner.dto";
import { Learner as LearnerEntity } from "../domain/learner.entity";
import { LearnerQuiz as LearnerQuizEntity } from "../domain/learners_quizzes.entity";
import { IAssignLearnerService } from "../interfaces/services/assign.learner.service.interface";
import { Queue } from "bullmq";
import { InjectQueue } from "@nestjs/bullmq";
import { QuizAssignmentFailedException } from "../exceptions";

@Injectable()
export class AssignLearnerService implements IAssignLearnerService {

  constructor(
    private readonly dataSource: DataSource,
    @InjectQueue("emails")
    private readonly emailsQueue: Queue
  ) { }

  async assign(assignLearnerDto: AssignLearnerDto, spaceId: number): Promise<void> {
    const { learners } = assignLearnerDto;

    await this.dataSource.transaction(async (manager) => {
      const emails = [...new Set(learners.map(l => l.email))];
      const learnerRepo = manager.getRepository(LearnerEntity);

      const existingLearners = await learnerRepo.find({
        where: {
          email: In(emails),
          space: { id: spaceId }
        }
      });

      if (existingLearners.length === 0) {
        throw new QuizAssignmentFailedException();
      }

      const learnerByEmail = new Map(
        existingLearners.map(l => [l.email, l])
      );

      for (const { email } of existingLearners) {
        if (!learnerByEmail.has(email)) {
          console.error(`Learner ${email} not found in space ${spaceId}`);
          throw new QuizAssignmentFailedException();
        }
      }
      const learnerQuizRepo = manager.getRepository(LearnerQuizEntity);

      const alreadyAssigned = await learnerQuizRepo.find({
        where: learners.map(({ email, quizId }) => ({
          learner: { id: learnerByEmail.get(email).id },
          quizId
        }))
      });

      if (alreadyAssigned.length > 0) {
        console.error("Some learners are already assigned:", alreadyAssigned);
        throw new QuizAssignmentFailedException();
      }

      const inserts: LearnerQuizEntity[] = [];

      for (const { email, quizId } of learners) {
        inserts.push(
          learnerQuizRepo.create({
            learnerId: learnerByEmail.get(email).id,
            quizId,
            status: "assigned",
            assignedAt: new Date(),
            hash: crypto.randomBytes(20).toString("hex")
          })
        );
      }

      const savedAssignments = await learnerQuizRepo.save(inserts);

      for (const saved of savedAssignments) {
        const { learnerId, hash } = saved;

        // find email
        const email = existingLearners.find(l => l.id === learnerId)!.email;

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
          throw new QuizAssignmentFailedException();
        }
      }
    });
  }
}
