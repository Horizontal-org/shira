import { App } from 'src/modules/app/domain';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Question } from './question.entity';
import { ExplanationTranslation } from '../../translation/domain/explanationTranslation.entity';

@Entity({ name: 'explanations' })
export class Explanation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'explanation_index', length: 150 })
  index: string;

  @Column({ name: 'explanation_position', length: 150 })
  position: string;

  @Column({ name: 'explanation_text', length: 150 })
  text: string;

  @ManyToOne(() => Question, (question: Question) => question.explanations, {
    // eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @OneToMany(
    () => ExplanationTranslation,
    (explanationTranslation: ExplanationTranslation) =>
      explanationTranslation.explanation,
  )
  explanationTranslations: ExplanationTranslation[];
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
