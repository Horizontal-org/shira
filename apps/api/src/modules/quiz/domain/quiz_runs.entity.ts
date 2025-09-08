import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index
} from 'typeorm';

@Entity({ name: 'quiz_runs' })
@Index('idx_quiz_runs_quiz', ['quizId', 'startedAt'])
@Index('idx_quiz_runs_learner', ['learnerId', 'quizId', 'startedAt'])
export class QuizRuns {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ name: 'quiz_id'})
  quizId: string;

  @Column({ name: 'learner_id', nullable: true })
  learnerId?: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @Column({ name: 'started_at' })
  startedAt!: Date;

  @Column({ name: 'finished_at', nullable: true })
  finishedAt?: Date | null;
}