import { UserEntity } from "src/modules/user/domain/user.entity"
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { OrganizationEntity } from "./organization.entity"
import { RoleEntity } from "src/modules/user/domain/role.entity"

@Entity({ name: 'organizations_users' })
export class OrganizationUsersEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'user_id' })
    userId: number

    @Column({ name: 'organization_id' })
    organizationId: number

    @Column({ name: 'role_id' })
    roleId: number

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @ManyToOne(() => OrganizationEntity)
    @JoinColumn({ name: 'organization_id' })
    organization: OrganizationEntity

    @ManyToOne(() => RoleEntity)
    @JoinColumn({ name: 'role_id' })
    role: RoleEntity

    @Column({ name: 'created_at' })
    createdAt: Date

    @Column({ name: 'updated_at' })
    updatedAt: Date
}