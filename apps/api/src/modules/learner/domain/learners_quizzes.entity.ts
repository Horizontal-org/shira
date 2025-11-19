import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Quiz } from 'src/modules/quiz/domain/quiz.entity';
import { Learner } from './learner.entity';

@Exclude()
@Entity({ name: 'learners_quizzes' })
export class LearnerQuiz {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'quiz_id', type: 'int' })
  quizId: number;

  @Expose()
  @Column({ name: 'learner_id', type: 'int' })
  learnerId: number;

  @Expose()
  @Column({
    name: 'status',
    type: 'enum',
    enum: ['assigned', 'in_progress', 'completed'],
  })
  status: 'assigned' | 'in_progress' | 'completed';

  @Expose()
  @Column({ name: 'hash', type: 'varchar', length: 255, nullable: true })
  hash?: string;

  @Expose()
  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Expose()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @Expose()
  @Column({ name: 'assigned_at', type: 'datetime' })
  assignedAt!: Date;

  @ManyToOne(() => Quiz, (quiz) => quiz.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @ManyToOne(() => Learner, (learner) => learner.learnerQuizzes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'learner_id' })
  learner: Learner;
}
