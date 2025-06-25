import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export enum RoleScope {
    ORGANIZATION = 'organization',
    SPACE = 'space'
}

@Entity({ name: 'roles' })
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    name: string

    @Column({ length: 255, nullable: true })
    description: string

    @Column({
        type: 'enum',
        enum: RoleScope
    })
    scope: RoleScope

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}