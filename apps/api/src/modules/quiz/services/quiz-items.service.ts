import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { QuizItem, QuizItemEntityType } from '../domain/quiz_items.entity';
import { Question } from 'src/modules/question/domain';
import { Note } from '../../note/domain';
import {
  HydratedQuizItem,
  IQuizItemsService,
  ReorderQuizItemInput,
} from '../interfaces/services/quiz-items.service.interface';

@Injectable()
export class QuizItemsService implements IQuizItemsService {

  constructor(
    @InjectRepository(QuizItem)
    private readonly quizItemRepo: Repository<QuizItem>,
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
    @InjectRepository(Note)
    private readonly noteRepo: Repository<Note>,
  ) {}

  async append(
    quizId: number,
    entityType: QuizItemEntityType,
    entityId: number,
    manager?: EntityManager,
  ): Promise<QuizItem> {
    const repo = manager ? manager.getRepository(QuizItem) : this.quizItemRepo;

    const position = await repo.count({ where: { quizId } });

    const quizItem = repo.create({
      position: position + 1,
      quizId,
      entityType,
      entityId,
    });

    return repo.save(quizItem);
  }

  async removeAndResequence(
    quizId: number,
    quizItemId: number,
    manager?: EntityManager,
  ): Promise<QuizItem> {
    const repo = manager ? manager.getRepository(QuizItem) : this.quizItemRepo;

    const items = await repo
      .createQueryBuilder('quiz_items')
      .where('quiz_id = :quizId', { quizId })
      .getMany();

    const itemToRemove = items.find((item) => item.id === quizItemId);
    if (!itemToRemove) {
      return undefined;
    }

    const remaining = items
      .filter((item) => item.id !== quizItemId)
      .sort((a, b) => a.position - b.position);

    remaining.forEach((item, index) => {
      item.position = index + 1;
    });

    await repo.save(remaining);
    await repo.delete(itemToRemove.id);

    return itemToRemove;
  }

  async insertAfter(
    quizId: number,
    afterQuizItemId: number,
    entityType: QuizItemEntityType,
    entityId: number,
    manager?: EntityManager,
  ): Promise<QuizItem> {
    const repo = manager ? manager.getRepository(QuizItem) : this.quizItemRepo;

    const afterItem = await repo.findOne({ where: { id: afterQuizItemId } });

    const shifted = (
      await repo.find({ where: { quizId } })
    ).filter((item) => item.position > afterItem.position);

    await repo.save(
      shifted.map((item) => ({
        ...item,
        position: item.position + 1,
      })),
    );

    const quizItem = repo.create({
      position: afterItem.position + 1,
      quizId,
      entityType,
      entityId,
    });

    return repo.save(quizItem);
  }

  async reorder(
    quizId: number,
    newOrder: ReorderQuizItemInput[],
    manager?: EntityManager,
  ): Promise<void> {
    const repo = manager ? manager.getRepository(QuizItem) : this.quizItemRepo;

    const items = await repo
      .createQueryBuilder('quiz_items')
      .where('quiz_id = :quizId', { quizId })
      .getMany();

    items.forEach((item) => {
      newOrder.forEach((newOrderItem) => {
        if (
          item.entityType === newOrderItem.entityType &&
          item.entityId === newOrderItem.entityId
        ) {
          item.position = newOrderItem.position;
        }
      });
    });

    await repo.save(items);
  }

  async hydrate(
    items: QuizItem[],
    options?: { questionRelations?: string[]; noteRelations?: string[] },
  ): Promise<HydratedQuizItem[]> {
    const questionIds = items
      .filter((item) => item.entityType === 'question')
      .map((item) => item.entityId);
    const noteIds = items
      .filter((item) => item.entityType === 'note')
      .map((item) => item.entityId);

    const [questions, notes] = await Promise.all([
      questionIds.length
        ? this.questionRepo.find({
            where: { id: In(questionIds) },
            relations: options?.questionRelations,
          })
        : Promise.resolve([]),
      noteIds.length
        ? this.noteRepo.find({
            where: { id: In(noteIds) },
            relations: options?.noteRelations,
          })
        : Promise.resolve([]),
    ]);

    const questionsById = new Map(questions.map((q) => [q.id, q]));
    const notesById = new Map(notes.map((n) => [n.id, n]));

    return items.map((item) => ({
      ...item,
      question: item.entityType === 'question' ? questionsById.get(item.entityId) : undefined,
      note: item.entityType === 'note' ? notesById.get(item.entityId) : undefined,
    }));
  }
}
