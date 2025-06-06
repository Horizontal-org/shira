import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { PlanEntity } from "./plan.entity";
import { OrganizationSubscriptionsEntity } from "src/modules/organization/domain/organization_subscriptions.entity";

export enum SubscriptionStatus {
  ACTIVE = 'active',
  TRIALING = 'trialing',
  CANCELED = 'canceled',
  PAST_DUE = 'past_due',
  PAUSED = 'paused'
}

@Entity({ name: 'subscriptions'})
export class SubscriptionEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'stripe_subscription_id', length: 255, nullable: true })
    stripeSubscriptionId: string

    @Column({ name: 'plan_id' })
    planId: number

    @Column({ 
        type: 'enum', 
        enum: SubscriptionStatus,
        default: SubscriptionStatus.TRIALING
    })
    status: SubscriptionStatus

    @Column({ name: 'start_date', type: 'timestamp', default: () => 'NOW()' })
    startDate: Date

    @Column({ name: 'end_date', type: 'timestamp', nullable: true })
    endDate: Date

    @Column({ name: 'trial_end_date', type: 'timestamp', nullable: true })
    trialEndDate: Date

    @Column({ name: 'canceled_at', type: 'timestamp', nullable: true })
    canceledAt: Date

    @ManyToOne(() => PlanEntity, (plan) => plan.subscriptions, {onDelete: 'RESTRICT'})
    @JoinColumn({ name: 'plan_id' })
    plan: PlanEntity

    @OneToMany(() => OrganizationSubscriptionsEntity, (orgSub) => orgSub.subscription)
    organizationSubscriptions: OrganizationSubscriptionsEntity[]

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}