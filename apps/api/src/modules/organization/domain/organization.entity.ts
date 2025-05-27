import { SpaceEntity } from "src/modules/space/domain/space.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrganizationUsersEntity } from "./organization_users.entity";
import { OrganizationSubscriptionsEntity } from "./organization_subscriptions.entity";

@Entity({ name: 'organizations' })
export class OrganizationEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string

    @Column({ name: 'stripe_customer_id', nullable: true })
    stripeCustomerId?: string

    @OneToMany(() => SpaceEntity, (space) => space.organization)
    spaces: SpaceEntity[]

    @OneToMany(() => OrganizationUsersEntity, (orgUser) => orgUser.organization)
    organizationUsers: OrganizationUsersEntity[]

    @OneToMany(() => OrganizationSubscriptionsEntity, (orgSub) => orgSub.organization)
    organizationSubscriptions: OrganizationSubscriptionsEntity[]
 
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}