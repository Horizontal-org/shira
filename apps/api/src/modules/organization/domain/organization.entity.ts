import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'organizations' })
export class OrganizationEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string

    @Column({ name: 'stripe_customer_id', nullable: true })
    stripeCustomerId?: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}