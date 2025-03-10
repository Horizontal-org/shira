import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddHashToQuizzes1741200180247 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
                "quizzes",
                new TableColumn({
                    name: "hash",
                    type: "varchar",
                    isNullable: true
                }),
            )
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
