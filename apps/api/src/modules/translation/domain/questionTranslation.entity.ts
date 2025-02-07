import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Question } from '../../question/domain/question.entity';
import { Language } from '../../languages/domain/languages.entity';

@Entity({ name: 'questions_translations' })
export class QuestionTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  //TODO REFACTOR AND CHOOSE ONE
  @ManyToOne(
    () => Question,
    (question: Question) => question.questionTranslations,
    {
      // eager: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'question_id' })
  question: Question;

  //TODO REFACTOR AND CHOOSE ONE
  @ManyToOne(
    () => Question,
    (question: Question) => question.questionTranslations,
    {
      // eager: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'question_id' })
  questionId: number;

  @ManyToOne(
    () => Language,
    (language: Language) => language.questionTranslations,
    {
      // eager: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'language_id' })
  languageId: number;

  @Column('text')
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
