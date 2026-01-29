import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from 'src/modules/user/domain/user.entity';
import { Expose } from 'class-transformer';

@Expose()
@Entity({ name: 'password_resets' })
export class PasswordResetEntity {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Expose()
  @Column()
  email: string;

  @Column({ name: 'reset_hash' })
  resetHash: string;

  @Column({ name: 'expires_at' })
  expiresAt: Date;

  @Column({ name: 'used_at', type: 'timestamp', nullable: true })
  usedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
