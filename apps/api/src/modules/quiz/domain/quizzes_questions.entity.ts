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
import { Explanation, Question } from 'src/modules/question/domain';
import { Quiz } from './quiz.entity';

@Entity({ name: 'quizzes_questions' })
export class QuizQuestion {

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
  @RelationId((quizQuestion: QuizQuestion) => quizQuestion.quiz)
  quizId?: number;

  @ManyToOne(
    () => Question,
    (question: Question) => question.quizQuestions,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'question_id' })
  question?: Question;


  @Column({ name: 'question_id' })
  @RelationId((quizQuestion: QuizQuestion) => quizQuestion.question)
  questionId?: number;

  @Column()
  position: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
