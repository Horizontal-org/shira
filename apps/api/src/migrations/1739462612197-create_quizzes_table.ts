import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateQuizzesTable1739462612197 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'quizzes',
              columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'published',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'space_id',
                    type: 'int'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'published_at',
                    type: 'timestamp',
                    default: 'now()',
                },
              ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            "quizzes",
            new TableForeignKey({
                columnNames: ["space_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "spaces",
                onDelete: "CASCADE",
            }),
        )

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS quizzes_questions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                quiz_id INT NOT NULL,
                question_id INT NOT NULL,
                position INT NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                FOREIGN KEY (quiz_id) REFERENCES quizzes(id),
                FOREIGN KEY (question_id) REFERENCES questions(id)
            );
        `);
        
        await queryRunner.query(`
            CREATE INDEX quiz_id_and_question_id ON quizzes_questions (quiz_id, question_id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('quizzes_questions');
        await queryRunner.dropTable('quizzes');
    }

}
