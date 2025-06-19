import { 
    MigrationInterface, 
    QueryRunner, 
    Table, 
    TableForeignKey, 
    TableIndex,
    TableColumn
} from "typeorm";

export class CreateUserAssociationsTable1747687264219 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //organizations_users table
        await queryRunner.createTable(
            new Table({
                name: "organization_users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true, 
                        generationStrategy: "increment"
                    },
                    {
                        name: "user_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "organization_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "role_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            }),
            true
        )

        await queryRunner.createForeignKey(
            "organization_users",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            })
        )

        await queryRunner.createForeignKey(
            "organization_users",
            new TableForeignKey({
                columnNames: ["organization_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "organizations",
                onDelete: "CASCADE"
            })
        );

        await queryRunner.createForeignKey(
            "organization_users",
            new TableForeignKey({
                columnNames: ["role_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                onDelete: "RESTRICT"
            })
        );

        await queryRunner.createIndex(
            "organization_users",
            new TableIndex({
                name: "IDX_USER_ORGANIZATION",
                columnNames: ["user_id", "organization_id"],
                isUnique: true
            })
        )

        // populate table
        const orgMemberRoleResult = await queryRunner.query(
            "SELECT id FROM roles WHERE name = 'organization-admin' AND scope = 'organization' LIMIT 1"
        )

        const orgMemberRoleId = orgMemberRoleResult[0]?.id;

        if(orgMemberRoleId) {
            await queryRunner.query(`
                INSERT INTO organization_users(user_id, organization_id, role_id, created_at, updated_at)
                SELECT
                    su.user_id,
                    s.organization_id,
                    ${orgMemberRoleId},
                    NOW(),
                    NOw()
                FROM spaces_users su
                JOIN spaces s ON su.space_id = s.id
                ON DUPLICATE KEY UPDATE updated_at = NOW()
            `)
        }

        //--------SPACE_USERS----------------

        // add role_id into spaces_users table
        await queryRunner.addColumn(
            "spaces_users",
            new TableColumn({
                name: "role_id",
                type: "int",
                isNullable: true // initially nullable to avoid conflicts
            })
        )
        // get space-admin role
        const spaceAdminRoleResult = await queryRunner.query(
            "SELECT id FROM roles WHERE name = 'space-admin' AND scope = 'space' LIMIT 1" // move 'space-admin' to a const
        )

        const spaceAdminRoleId = spaceAdminRoleResult[0]?.id;

        if (spaceAdminRoleId) { // for now we set all space users to be space admins
            await queryRunner.query(`
                UPDATE spaces_users
                SET role_id = ${spaceAdminRoleId}
                WHERE role_id IS NULL
            `);
        }

        await queryRunner.changeColumn(
            "spaces_users",
            "role_id",
            new TableColumn({
                name: "role_id",
                type: "int",
                isNullable: false // set as non nullable after updating the data
            })
        )

        // Add foreign key for role_id in spaces_users
        await queryRunner.createForeignKey(
            "spaces_users",
            new TableForeignKey({
                columnNames: ["role_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                onDelete: "RESTRICT"
            })
        )
    }



    public async down(queryRunner: QueryRunner): Promise<void> {
        // -------- REVERT CHANGES TO spaces_users --------
        // Remove foreign key on role_id in spaces_users
        const spacesUsersTable = await queryRunner.getTable("spaces_users")
        const roleFKInSpacesUsers = spacesUsersTable?.foreignKeys.find(fk => fk.columnNames.includes("role_id"))
        if (roleFKInSpacesUsers) {
            await queryRunner.dropForeignKey("spaces_users", roleFKInSpacesUsers);
        }

        // Remove the role_id column from spaces_users
        await queryRunner.dropColumn("spaces_users", "role_id")

        // -------- DROP organization_users TABLE AND ITS CONSTRAINTS --------

        // Get the table with foreign keys
        const orgUsersTable = await queryRunner.getTable("organization_users")

        // Drop foreign keys
        if (orgUsersTable) {
            for (const fk of orgUsersTable.foreignKeys) {
                await queryRunner.dropForeignKey("organization_users", fk)
            }
        }

        // Drop index
        await queryRunner.dropIndex("organization_users", "IDX_USER_ORGANIZATION")

        // Drop organization_users table
        await queryRunner.dropTable("organization_users")
    }

}
