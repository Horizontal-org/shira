import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'passphrases' })
export class PassphraseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  code: string;

  @Column({ name: 'used_by', length: 150 })
  usedBy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
