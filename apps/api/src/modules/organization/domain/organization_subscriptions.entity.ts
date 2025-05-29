import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { OrganizationEntity } from "./organization.entity";
import { SubscriptionEntity } from "src/modules/billing/domain/subscription.entity";

@Entity({ name: 'organization_subscriptions'})
export class OrganizationSubscriptionsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'organization_id'})
    organizationId: number

    @Column({ name: 'subscription_id'})
    subscriptionId: number

    @ManyToOne(() => OrganizationEntity, (org) => org.organizationSubscriptions)
    @JoinColumn({ name: 'organization_id' })
    organization: OrganizationEntity

    @ManyToOne(() => SubscriptionEntity)
    @JoinColumn({ name: 'subscription_id' })
    subscription: SubscriptionEntity;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    
}