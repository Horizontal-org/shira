import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

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
                        name: 'question_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'answer',
                        type: 'enum',
                        enum: ['is_legitimate', 'is_phishing', 'dont_know'],
                        isNullable: true,
                    },
                    {
                        name: 'answered_at',
                        type: 'datetime',
                        isNullable: true,
                    },
                ],
            }),
        );

        await queryRunner.createIndex(
            'question_runs',
            new TableIndex({
                name: 'idx_question_runs_question',
                columnNames: ['question_id'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('question_runs', 'idx_question_runs_question');
        await queryRunner.dropTable('question_runs');
    }
}
