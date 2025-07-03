import { App } from 'src/modules/app/domain';
import { FieldOfWork } from 'src/modules/field_of_work/domain';
import { MessageType } from 'src/modules/message_type/domain/message_type.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Explanation } from './explanation.entity';
import { QuestionTranslation } from '../../translation/domain/questionTranslation.entity';
import { Language } from 'src/modules/languages/domain';
import { QuizQuestion } from 'src/modules/quiz/domain/quizzes_questions.entity';
import { QuestionImage } from 'src/modules/question_image/domain/question_images.entity';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  content: string;

  @Column({ name: 'is_phising' })
  isPhising: number;

  @ManyToMany(() => FieldOfWork, (fieldOfWork) => fieldOfWork.questions)
  @JoinTable({
    name: 'questions_fields_of_work',
    joinColumn: {
      name: 'question_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'field_of_work_id',
      referencedColumnName: 'id',
    },
  })
  fieldsOfWork?: FieldOfWork[]

  // @Column({ name: 'field_of_work_id' })
  // fieldOfWorkId: number;

  @Column({ name: 'language_id' })
  languageId: number;

  @ManyToMany(() => App, (app) => app.questions)
  @JoinTable({
    name: 'apps_questions',
    joinColumn: {
      name: 'question_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'app_id',
      referencedColumnName: 'id',
    },
  })
  apps?: App[];

  @OneToMany(
    () => Explanation,
    (explanation: Explanation) => explanation.question,
  )
  explanations: Explanation[];

  @OneToMany(
    () => QuestionTranslation,
    (questionTranslation: QuestionTranslation) => questionTranslation.question,
  )
  questionTranslations: QuestionTranslation[];

  @OneToMany(
    () => QuizQuestion,
    (quizQuestion: QuizQuestion) =>
      quizQuestion.question,
  )
  quizQuestions?: QuizQuestion[];

  @OneToMany(
    () => QuestionImage,
    (questionImage: QuestionImage) =>
      questionImage.question,
  )
  images?: QuestionImage[];

  @Column()
  type: 'demo' | 'quiz';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
