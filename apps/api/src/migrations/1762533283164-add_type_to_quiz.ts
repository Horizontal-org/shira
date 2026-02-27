import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTypeToQuiz1762533283164 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "quizzes",
            new TableColumn({
                name: "visibility",
                type: "enum",
                enum: ["public", "private"],
                default: "'public'",
                isNullable: false
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('quizzes', "visibility")
    }

}
