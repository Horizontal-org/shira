import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Easyness } from './easyness.survey.enum';
import { Recommend } from './recommend.survey.enum';


@Exclude()
@Entity({ name: 'surveys' })
export class Survey {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  easyness: Easyness;

  @Column()
  recommend: Recommend;

  @Column()
  improvements: string;

  @Expose()
  @Column({ name: 'created_at' })
  createdAt!: Date;
}
