import { SpaceEntity } from 'src/modules/space/domain/space.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrganizationUsersEntity } from './organization_users.entity';
import { ORGANIZATION_TYPES, OrganizationType } from './organization-type';

@Entity({ name: 'organizations' })
export class OrganizationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'stripe_customer_id', nullable: true })
  stripeCustomerId?: string;

  @Column({
    name: 'organization_type',
    type: 'enum',
    enum: ORGANIZATION_TYPES,
  })
  organizationType: OrganizationType;

  @OneToMany(() => SpaceEntity, (space) => space.organization)
  spaces: SpaceEntity[];

  @OneToMany(() => OrganizationUsersEntity, (orgUser) => orgUser.organization)
  organizationUsers: OrganizationUsersEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
