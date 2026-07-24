import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddObscureColumnToQuizzes1783964049101 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "quizzes",
            new TableColumn({
                name: "assessment_mode",
                type: "boolean",
                default: false,
                isNullable: false,
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("quizzes", "assessment_mode")
    }

}
