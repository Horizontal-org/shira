import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddOrganizationIdToSpaces1747680300996 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "spaces",
            new TableColumn({
                name: "organization_id",
                type: "int",
                isNullable: true // initially nullable to avoid conflicts
            })
        )

        await queryRunner.query(`
            UPDATE spaces s
            JOIN organizations o ON 
                o.name = CASE 
                    WHEN s.slug IS NOT NULL AND s.slug != '' THEN s.slug
                    ELSE CONCAT('Organization for ', s.name)
                END
            SET s.organization_id = o.id
        `)

        await queryRunner.changeColumn(
            "spaces",
            "organization_id",
            new TableColumn({
                name: "organization_id",
                type: "int",
                isNullable: false, // make it not nullable after the data is migrated
            })
        )

        await queryRunner.createForeignKey(
            "spaces",
            new TableForeignKey({
                columnNames: ["organization_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "organizations",
                onDelete: "CASCADE",
            })
        )


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("spaces");
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("organization_id") !== -1
        )
        await queryRunner.dropForeignKey("spaces", foreignKey)

        await queryRunner.dropColumn("spaces", "organization_id")
    }

}
