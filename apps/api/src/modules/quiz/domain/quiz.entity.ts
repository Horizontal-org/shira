import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuizQuestion } from './quizzes_questions.entity';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';
import { QuestionImage } from 'src/modules/question_image/domain';

@Exclude()
@Entity({ name: 'quizzes' })
export class Quiz {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  title: string;

  @Expose()
  @Column()
  published: boolean;

  @Expose()
  @Column()
  hash: string;
  
  @OneToMany(
    () => QuizQuestion,
    (quizQuestion: QuizQuestion) =>
      quizQuestion.quiz,
  )
  quizQuestions: QuizQuestion[];

  @OneToMany(
    () => QuestionImage,
    (questionImage: QuestionImage) =>
      questionImage.quiz,
  )
  images?: QuestionImage[];
  

  @ManyToOne(() => SpaceEntity, (space: SpaceEntity) => space.quizzes)
  @JoinColumn({ name: 'space_id' })
  space: SpaceEntity;

  
  @Expose()
  @Column({ name: 'created_at' })
  createdAt!: Date;

  @Expose()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @Expose()
  @Column({ name: 'published_at' })
  publishedAt!: Date;
}
