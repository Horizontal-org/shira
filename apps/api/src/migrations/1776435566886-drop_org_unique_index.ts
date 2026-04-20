import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class DropOrgUniqueIndex1776435566886 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("organizations", "IDX_ORGANIZATION_NAME");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createIndex(
            "organizations",
            new TableIndex({
                name: "IDX_ORGANIZATION_NAME",
                columnNames: ["name"],
                isUnique: true,
            })
        );
    }

}
