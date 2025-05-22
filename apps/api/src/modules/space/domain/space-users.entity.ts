import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { SpaceEntity } from './space.entity'
import { UserEntity } from 'src/modules/user/domain/user.entity'
import { RoleEntity } from 'src/modules/user/domain/role.entity'

@Entity({ name: 'spaces_users' })
export class SpaceUserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'user_id' })
    userId: number

    @Column({ name: 'space_id' })
    spaceId: number

    @Column({ name: 'role_id' })
    roleId: number

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @ManyToOne(() => SpaceEntity)
    @JoinColumn({ name: 'space_id' })
    space: SpaceEntity

    @ManyToOne(() => RoleEntity)
    @JoinColumn({ name: 'role_id' })
    role: RoleEntity

    @Column({ name: 'created_at' })
    createdAt: Date

    @Column({ name: 'updated_at' })
    updatedAt: Date
}