import {
  Entity, PrimaryGeneratedColumn, Column, Index
} from 'typeorm';

export enum Answer {
  Legitimate = 'is_legitimate',
  Phishing = 'is_phishing',
  Unknown = 'dont_know'
}

@Entity({ name: 'question_runs' })
@Index('idx_question_runs_question', ['questionId'])
export class QuestionRun {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'question_id' })
  questionId!: string;

  @Column({ type: 'enum', enum: Answer, nullable: true })
  answer?: string;

  @Column({ name: 'answered_at', type: 'datetime', nullable: true })
  answeredAt?: Date | null;
}
