import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';
import { LearnerQuiz } from './learners_quizzes.entity';

@Exclude()
@Entity({ name: 'learners' })
export class Learner {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'space_id', type: 'int' })
  spaceId: number;

  @Expose()
  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;

  @Expose()
  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Expose()
  @Column({
    name: 'status',
    type: 'enum',
    enum: ['invited', 'registered', 'assigned'],
  })
  status: 'invited' | 'registered' | 'assigned';

  @Expose()
  @Column({ name: 'assigned_by', type: 'int', nullable: true })
  assignedBy?: number;

  @Expose()
  @Column({ name: 'invitation_token', type: 'varchar', length: 255, nullable: true })
  invitationToken?: string;

  @Expose()
  @Column({ name: 'invitation_token_expires_at', type: 'datetime', nullable: true })
  invitationTokenExpiresAt?: Date;

  @Expose()
  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Expose()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @Expose()
  @Column({ name: 'invited_at', type: 'datetime', nullable: true })
  invitedAt?: Date;

  @Expose()
  @Column({ name: 'registered_at', type: 'datetime', nullable: true })
  registeredAt?: Date;

  @ManyToOne(() => SpaceEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'space_id' })
  space: SpaceEntity;

  @OneToMany(() => LearnerQuiz, (lq) => lq.learner)
  learnerQuizzes: LearnerQuiz[];
}
