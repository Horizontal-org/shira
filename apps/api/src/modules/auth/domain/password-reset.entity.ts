import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'password_resets' })
export class PasswordResetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  email: string;

  @Column({ name: 'reset_hash', length: 80 })
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
