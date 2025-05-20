import { MigrationInterface, QueryRunner, Table, TableIndex, TableColumn } from "typeorm";

export class CreateRolesTable1747684221548 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "roles",
                columns: [
                     {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "50",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: "scope",
                        type: "enum",
                        enum: ["organization", "space"],
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ]
            }),
            true
        )

        await queryRunner.createIndex(
            "roles",
            new TableIndex({
                name: "IDX_ROLE_NAME_SCOPE",
                columnNames: ["name", "scope"],
                isUnique: true,
            })
        );

        await queryRunner.query(`
            INSERT INTO roles (name, description, scope, created_at, updated_at)
            VALUES
                ('organization-admin', 'Full administrative access to the organization', 'organization', NOW(), NOW()),
                ('organization-member', 'Regular member of the organization', 'organization', NOW(), NOW()),
                ('space-admin', 'Administrator of a space', 'space', NOW(), NOW()),
                ('space-editor', 'Editor with content creation privileges in a space', 'space', NOW(), NOW())
        `)

        // remove role column from users table
        const usersTable = await queryRunner.getTable("users")
        const roleColumn = usersTable?.findColumnByName("role")

        if(roleColumn) {
            await queryRunner.dropColumn("users", "role")
        }

        // add is super admin flag to users
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "is_super_admin",
                type: "boolean",
                default: false,
                isNullable: false,
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("roles", "IDX_ROLE_NAME_SCOPE")
        await queryRunner.dropTable("roles")

        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "role",
                type: "varchar",
            })
        );

        // Optional: Migrate back based on user role (if needed)
        // await queryRunner.query(...)

        // --- 3. Drop roles index and table ---
        await queryRunner.dropIndex("roles", "IDX_ROLE_NAME_SCOPE")
        await queryRunner.dropTable("roles")
    }

}
