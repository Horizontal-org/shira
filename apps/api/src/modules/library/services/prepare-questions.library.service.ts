import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, SelectQueryBuilder } from 'typeorm'

import { Question } from 'src/modules/question/domain'
import { IPrepareQuestionsLibraryService } from '../interfaces/services/prepare-questions.library.service.interface'

@Injectable()
export class PrepareQuestionsLibraryService implements IPrepareQuestionsLibraryService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) { }

  async getQuestion(questionId: number, spaceId: number): Promise<Question> {
    return this.baseQuery()
      .where('question.id = :id', { id: questionId })
      .andWhere('question.type = :type', { type: 'quiz' })
      .andWhere('space.id = :spaceId', { spaceId })
      .getOne()
  }

  async getQuestionsByQuizId(quizId: number, spaceId: number): Promise<Question[]> {
    return this.baseQuery()
      .where('quiz.id = :quizId', { quizId })
      .andWhere('question.type = :type', { type: 'quiz' })
      .andWhere('space.id = :spaceId', { spaceId })
      .getMany()
  }

  prepareQuestionForPublishing(question: Question) {
    if (!question.apps || question.apps.length === 0) return null

    const firstApp = question.apps[0]
    const [qt] = question.questionTranslations

    const explanations = question.explanations.map((explanation) => {
      const [explanationTranslation] = explanation.explanationTranslations

      return {
        position: explanation.position,
        index: Number(explanation.index),
        content: explanationTranslation.content,
      }
    })

    return {
      name: question.name,
      isPhishing: Boolean(question.isPhising),
      content: qt.content,
      defaultApp: firstApp.name,
      appType: firstApp.type,
      explanations,
    }
  }

  private baseQuery(): SelectQueryBuilder<Question> {
    return this.questionRepo
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.questionTranslations', 'qt')
      .leftJoinAndSelect('qt.languageId', 'qtLang')
      .leftJoinAndSelect('question.apps', 'app')
      .leftJoinAndSelect('question.explanations', 'explanation')
      .leftJoinAndSelect('explanation.explanationTranslations', 'explanationTranslation')
      .leftJoinAndSelect('explanationTranslation.languageId', 'etLang')
      .leftJoinAndSelect('question.quizQuestions', 'quizQuestion')
      .leftJoinAndSelect('quizQuestion.quiz', 'quiz')
      .leftJoinAndSelect('quiz.space', 'space')
      .select([
        'question.id',
        'question.name',
        'question.type',
        'question.createdAt',
        'question.isPhising',
        'qt.id',
        'qt.content',
        'qtLang.id',
        'qtLang.code',
        'qtLang.name',
        'app.id',
        'app.name',
        'app.type',
        'explanation.id',
        'explanation.position',
        'explanation.index',
        'explanationTranslation.id',
        'explanationTranslation.content',
        'etLang.id',
        'etLang.code',
        'etLang.name',
        'quizQuestion.id',
        'quiz.id',
        'space.id',
        'space.name',
      ])
  }
}
