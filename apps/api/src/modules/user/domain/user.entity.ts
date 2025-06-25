import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.enum';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';


@Exclude()
@Entity({ name: 'users' })
export class UserEntity {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ length: 80 })
  email: string;


  @ManyToMany(
    () => SpaceEntity, 
    {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinTable({
    name: 'spaces_users',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'space_id',
      referencedColumnName: 'id',
    },
  })
  spaces: SpaceEntity[]
  

  @Column()
  password: string;

  @Column({ name: 'is_super_admin'})
  isSuperAdmin: boolean;

  @Expose()
  @Column({ name: 'created_at' })
  createdAt!: Date;
}
