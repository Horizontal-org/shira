import {
  Entity, PrimaryGeneratedColumn, Column, Index,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { QuizRun } from '../domain/quiz_runs.entity';
import { Question } from 'src/modules/question/domain';

export enum Answer {
  Legitimate = 'is_legitimate',
  Phishing = 'is_phishing',
  Unknown = 'dont_know'
}

@Entity({ name: 'question_runs' })
@Index('idx_question_runs_run', ['quizRunId'])
@Index('idx_question_runs_question', ['questionId'])
@Index('uq_question_runs_run_question', ['quizRunId', 'questionId'], { unique: true })
export class QuestionRun {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'quiz_run_id', type: 'int' })
  quizRunId!: number;

  @ManyToOne(() => QuizRun, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quiz_run_id' })
  run!: QuizRun;

  @Column({ name: 'question_id' })
  questionId!: number;

  @ManyToOne(() => Question, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'question_id' })
  question!: Question;

  @Column({ type: 'enum', enum: Answer, nullable: true })
  answer: string;

  @Column({ name: 'answered_at', nullable: true })
  answeredAt?: Date | null;
}
