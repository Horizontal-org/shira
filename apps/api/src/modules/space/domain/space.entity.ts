import { UserEntity } from 'src/modules/user/domain/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  
  @Entity({ name: 'spaces' })
  export class SpaceEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 150 })
    name: string;
  
    @ManyToMany(
      () => UserEntity, 
      {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinTable({
      name: 'spaces_users',
      joinColumn: {
        name: 'space_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'user_id',
        referencedColumnName: 'id',
      },
    })
    users: UserEntity[]
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  }
  