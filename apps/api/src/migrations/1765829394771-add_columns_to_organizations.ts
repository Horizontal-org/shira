import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnsToOrganizations1765829394771 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "organizations",
            new TableColumn({
                name: 'organization_type',
                type: "enum",
                enum: ["business", "cibersecurity", "non-profit", "individual"],
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('organizations', "organization_type")
    }

}
