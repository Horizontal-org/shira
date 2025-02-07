import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addIndexToExplanations1673279347037 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "explanations",
            new TableColumn({
                name: "explanation_index",
                type: "varchar",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
