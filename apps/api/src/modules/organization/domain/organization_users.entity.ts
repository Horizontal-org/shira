import { Role } from "src/modules/user/domain/role.enum"
import { UserEntity } from "src/modules/user/domain/user.entity"
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { OrganizationEntity } from "./organization.entity"

@Entity({ name: 'organization_users' })
export class OrganizationUsersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'user_id' })
    userId: number

    @Column({ name: 'organization_id' })
    organizationId: number

    @Column({
        name: 'role_id',
        type: 'enum',
        enum: Role,
        default: Role.OrganizaitonMember
    })
    role: Role

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @ManyToOne(() => OrganizationEntity)
    @JoinColumn({ name: 'organization_id' })
    organization: OrganizationEntity

    @Column({ name: 'created_at' })
    createdAt: Date

    @Column({ name: 'updated_at' })
    updatedAt: Date
}