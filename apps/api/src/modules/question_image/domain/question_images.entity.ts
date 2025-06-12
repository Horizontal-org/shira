import { Question } from 'src/modules/question/domain';
import { Quiz } from 'src/modules/quiz/domain/quiz.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, RelationId } from 'typeorm';

@Entity({ name: 'question_images' })
export class QuestionImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'relative_path' })
  relativePath: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  // RELATIONS
  @ManyToOne(
    () => Question,
    (question: Question) => question.images,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'question_id' })
  question?: Question;


  @Column({ name: 'question_id' })
  @RelationId((questionImage: QuestionImage) => questionImage.question)
  questionId?: number;

  @ManyToOne(
    () => Quiz,
    (quiz: Quiz) => quiz.images,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'quiz_id' })
  quiz?: Quiz;


  @Column({ name: 'quiz_id' })
  @RelationId((questionImage: QuestionImage) => questionImage.quiz)
  quizId?: number;
}
