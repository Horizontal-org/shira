import { MigrationInterface, QueryRunner, TableForeignKey, TableIndex } from "typeorm";

export class AddFkQuizRunsToLearnersQuizzes1763646108120 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createIndex(
            "quiz_runs",
            new TableIndex({
                name: "idx_quiz_runs_quiz_learner",
                columnNames: ["quiz_id", "learner_id"],
            }),
        );

        await queryRunner.createForeignKey(
            "quiz_runs",
            new TableForeignKey({
                name: "fk_quiz_runs_learners_quizzes",
                columnNames: ["quiz_id", "learner_id"],
                referencedTableName: "learners_quizzes",
                referencedColumnNames: ["quiz_id", "learner_id"],
                onDelete: "CASCADE",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("quiz_runs", "fk_quiz_runs_learners_quizzes");
        await queryRunner.dropIndex("quiz_runs", "idx_quiz_runs_quiz_learner");
    }
}
