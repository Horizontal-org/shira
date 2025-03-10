import { Question } from 'src/modules/question/domain/question.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'fields_of_work' })
export class FieldOfWork {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 150 })
  slug: string;

  // @OneToMany(() => Question, (question: Question) => question.fieldOfWork, {
  //   onDelete: 'CASCADE',
  // })
  // questions: Question[]


  @ManyToMany(() => Question, question => question.fieldsOfWork)
  @JoinTable({
    name: 'questions_fields_of_work',
    joinColumn: {
      name: 'field_of_work_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'question_id',
      referencedColumnName: 'id',
    }
  })
  questions: Question[];
    
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
