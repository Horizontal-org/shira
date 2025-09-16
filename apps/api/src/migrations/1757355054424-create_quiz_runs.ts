import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateQuizRunsTable1757355054424 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'quiz_runs',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'quiz_id',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'learner_id',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'created_at',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP'
                    },
                    {
                        name: 'started_at',
                        type: 'datetime',
                        isNullable: false
                    },
                    {
                        name: 'finished_at',
                        type: 'datetime',
                        isNullable: true
                    },
                ]
                
            }),
            true,
        );

        // FKs
        await queryRunner.createForeignKey(
            'quiz_runs',
            new TableForeignKey({
                name: 'fk_quiz_runs_quiz',
                columnNames: ['quiz_id'],
                referencedTableName: 'quizzes',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );

        // Indexes
        await queryRunner.createIndex(
            'quiz_runs',
            new TableIndex({
                name: 'idx_quiz_runs_quiz',
                columnNames: ['quiz_id', 'started_at'],
            }),
        );

        await queryRunner.createIndex(
            'quiz_runs',
            new TableIndex({
                name: 'idx_quiz_runs_learner',
                columnNames: ['learner_id', 'quiz_id', 'started_at'],
            }),
        );

        await queryRunner.createIndex(
            'quiz_runs',
            new TableIndex({
                name: 'idx_quiz_runs_quiz_only',
                columnNames: ['quiz_id'],
            }),
        );

        await queryRunner.createIndex(
            'quizzes',
            new TableIndex({
                name: 'idx_quizzes_space',
                columnNames: ['space_id', 'id'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('quizzes', 'idx_quizzes_space');

        await queryRunner.dropIndex('quiz_runs', 'idx_quiz_runs_quiz_only');
        await queryRunner.dropIndex('quiz_runs', 'idx_quiz_runs_learner');
        await queryRunner.dropIndex('quiz_runs', 'idx_quiz_runs_quiz');

        await queryRunner.dropForeignKey('quiz_runs', 'fk_quiz_runs_quiz');
        await queryRunner.dropTable('quiz_runs');
    }
}
