import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQuizItems1786000000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE quizzes_questions
            RENAME TO quiz_items
        `);

        await queryRunner.query(`
            ALTER TABLE quiz_items
            ADD COLUMN entity_type ENUM('question', 'note') NOT NULL DEFAULT 'question'
        `);

        await queryRunner.query(`
            ALTER TABLE quiz_items
            CHANGE COLUMN question_id entity_id INT NOT NULL
        `);

        // MySQL may rename auto-generated FK constraint names when the table itself is
        // renamed, so look up the current name instead of assuming it's unchanged.
        const fkConstraint = await queryRunner.query(`
            SELECT
                CONSTRAINT_NAME
            FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE
                TABLE_NAME = 'quiz_items'
            AND
                COLUMN_NAME = 'entity_id'
            AND
                REFERENCED_TABLE_NAME = 'questions';
        `);

        if (fkConstraint && fkConstraint.length > 0) {
            await queryRunner.query(`ALTER TABLE quiz_items DROP FOREIGN KEY ${fkConstraint[0].CONSTRAINT_NAME}`);
        } else {
            console.log('!!! COULDNT FIND FK ON quiz_items.entity_id, DELETE MANUALLY IF PRESENT');
        }

        await queryRunner.query(`
            CREATE TABLE notes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                content MEDIUMTEXT NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
