import { Injectable } from "@nestjs/common";
import { IDeleteSpaceService } from "../interfaces/services/delete.space.service.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { SpaceEntity } from "../domain/space.entity";
import { In, Repository } from "typeorm";
import { Quiz } from "src/modules/quiz/domain/quiz.entity";
import { QuizQuestion } from "src/modules/quiz/domain/quizzes_questions.entity";

@Injectable()
export class DeleteSpaceService implements IDeleteSpaceService {
  constructor(
    @InjectRepository(SpaceEntity)
    private readonly spaceRepo: Repository<SpaceEntity>,
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
    @InjectRepository(QuizQuestion)
    private readonly quizQuestionRepo: Repository<QuizQuestion>
  ){}

  async execute(id: number): Promise<void> {
    const space = await this.spaceRepo.findOne({
      where: { id },
      relations: ['users']
    })

    if(!space) {
      return
    }

    space.users = []
    await this.spaceRepo.save(space)
    
    const quizzes = await this.quizRepo.find({
      where: { space: { id } }
    })

    if(quizzes.length > 0) {
      const quizIds = quizzes.map(quiz => quiz.id)
      await this.quizQuestionRepo.delete({
        quiz: { id: In(quizIds)}
      });

      await this.quizRepo.delete({
        space: { id }
      })
    }

    await this.spaceRepo.delete(id)
  }
}