import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnsToPassphrases1766157556286 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "passphrases",
            new TableColumn({
                name: 'organization_type',
                type: "enum",
                enum: ["business", "cibersecurity", "non-profit", "individual"],
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('passphrases', "organization_type")
    }

}
