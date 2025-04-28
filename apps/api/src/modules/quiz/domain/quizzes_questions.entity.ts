import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Explanation, Question } from 'src/modules/question/domain';
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
  quiz?: Quiz;

  @Column({ name: 'quiz_id' })
  quizId?: number;

  @Column({ name: 'question_id' })
  questionId?: number;

  @ManyToOne(
    () => Question,
    (question: Question) => question.quizQuestion,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'question_id' })
  question?: Question;

  @Column()
  position: number;

  @Column({ name: 'created_at' })
  created_at: Date;

  @Column({ name: 'updated_at' })
  updated_at: Date;
}
