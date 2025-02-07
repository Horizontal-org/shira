import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Exclude()
@Entity({ name: 'registrations' })
export class RegistrationEntity {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ name: 'space_name', length: 80 })
  spaceName: string;

  @Expose()
  @Column({ length: 80 })
  email: string;

  @Column()
  password: string;

  @Column()
  passphrase: string;

  @Column({ name: 'invitation_hash' })
  invitationHash: string;

  @Expose()
  @Column({ name: 'expires_at' })
  expiresAt: Date;

  @Expose()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
