import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  RelationId,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Quiz } from './quiz.entity';

export type QuizItemEntityType = 'question' | 'note';

@Entity({ name: 'quiz_items' })
export class QuizItem {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Quiz,
    (quiz: Quiz) => quiz.quizQuestions,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'quiz_id' })
  quiz?: Quiz;

  @Column({ name: 'quiz_id' })
  @RelationId((quizItem: QuizItem) => quizItem.quiz)
  quizId?: number;

  @Column({ name: 'entity_type', type: 'enum', enum: ['question', 'note'] })
  entityType: QuizItemEntityType;

  @Column({ name: 'entity_id' })
  entityId: number;

  @Column()
  position: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
