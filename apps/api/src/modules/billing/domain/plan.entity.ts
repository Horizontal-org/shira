import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { SubscriptionEntity } from "./subscription.entity";

@Entity({ name: 'plans' })
export class PlanEntity {
    @PrimaryColumn()
    id: number

    @Column({ name: 'stripe_plan_id', length: 255, nullable: true })
    stripePlanId: string

    @Column({ length: 255 })
    name: string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number

    @Column({ length: 3, default: 'USD' })
    currency: string

    @Column({ type: 'enum', enum: ['month', 'year'] })
    interval: 'month' | 'year'

    @OneToMany(() => SubscriptionEntity, (subscription) => subscription.plan)
    subscriptions: SubscriptionEntity[]

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}