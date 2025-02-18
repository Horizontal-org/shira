import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Explanation, Question } from 'src/modules/question/domain';
import { Language } from 'src/modules/languages/domain';
import { Quiz } from './quiz.entity';

@Entity({ name: 'quizzes_questions' })
export class QuizQuestion {

    @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Quiz,
    (quiz: Quiz) => quiz.quizQuestion,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @ManyToOne(
    () => Question,
    (question: Question) => question.quizQuestion,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @Column()
  position: number;

  @Column({ name: 'created_at' })
  created_at: Date;

  @Column({ name: 'updated_at' })
  updated_at: Date;
}
