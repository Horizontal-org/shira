import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateOrganizationsTable1747678988454 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // create organizations table
        await queryRunner.createTable(
            new Table({
                name: "organizations",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "stripe_customer_id",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
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
            "organizations",
            new TableIndex({
                name: "IDX_ORGANIZATION_NAME",
                columnNames: ["name"],
                isUnique: true
            })
        )

        await queryRunner.query(`
            INSERT INTO organizations (name, created_at, updated_at)
            SELECT 
                CASE 
                    WHEN slug IS NOT NULL AND slug != '' THEN slug
                    ELSE CONCAT('Organization for ', name)
                END,
                NOW(), NOW() 
            FROM spaces
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("organizations", "IDX_ORGANIZATION_NAME")
        await queryRunner.dropTable("organizations")
    }

}
