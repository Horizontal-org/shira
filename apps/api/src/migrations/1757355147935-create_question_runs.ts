import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateQuestionRunsTable1757355147935 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'question_runs',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'quiz_run_id',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'question_id',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'answer',
                        type: 'enum',
                        enum: ['is_phishing', 'is_legitimate', 'dont_know'],
                        isNullable: false,
                    },
                    {
                        name: 'answered_at',
                        type: 'datetime',
                        isNullable: false
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'question_runs',
            new TableForeignKey({
                name: 'fk_question_runs_run',
                columnNames: ['quiz_run_id'],
                referencedTableName: 'quiz_runs',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'question_runs',
            new TableForeignKey({
                name: 'fk_question_runs_question',
                columnNames: ['question_id'],
                referencedTableName: 'questions',
                referencedColumnNames: ['id'],
                onDelete: 'RESTRICT',
            }),
        );

        // Indexes
        await queryRunner.createIndex(
            'question_runs',
            new TableIndex({
                name: 'idx_question_runs_run',
                columnNames: ['quiz_run_id'],
            }),
        );
        await queryRunner.createIndex(
            'question_runs',
            new TableIndex({
                name: 'idx_question_runs_question',
                columnNames: ['question_id'],
            }),
        );

        await queryRunner.createIndex(
            'question_runs',
            new TableIndex({
                name: 'uq_question_runs_run_question',
                columnNames: ['quiz_run_id', 'question_id'],
                isUnique: true, // prevent double answers per run
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('question_runs', 'uq_question_runs_run_question');
        await queryRunner.dropIndex('question_runs', 'idx_question_runs_question');
        await queryRunner.dropIndex('question_runs', 'idx_question_runs_run');

        await queryRunner.dropForeignKey('question_runs', 'fk_question_runs_question');
        await queryRunner.dropForeignKey('question_runs', 'fk_question_runs_run');

        await queryRunner.dropTable('question_runs');
    }
}
