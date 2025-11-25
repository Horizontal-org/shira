import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddFkToQuizRun1763646108119 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            "quiz_runs",
            new TableForeignKey({
                name: 'fk_quiz_runs_learner',
                columnNames: ['learner_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'learners',
                onDelete: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('quiz_runs', 'fk_quiz_runs_learner');
    }

}