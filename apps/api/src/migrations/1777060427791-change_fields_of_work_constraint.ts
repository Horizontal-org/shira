import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeFieldsOfWorkConstraint1777060427791 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const fkConstraint = await queryRunner.query(`
            SELECT CONSTRAINT_NAME
            FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE TABLE_SCHEMA = DATABASE()
              AND TABLE_NAME = 'questions_fields_of_work'
              AND COLUMN_NAME = 'question_id'
              AND REFERENCED_TABLE_NAME = 'questions'
              AND REFERENCED_COLUMN_NAME = 'id'
            LIMIT 1;
        `);

        if (fkConstraint?.length) {
            await queryRunner.query(`
                ALTER TABLE questions_fields_of_work
                DROP FOREIGN KEY ${fkConstraint[0].CONSTRAINT_NAME};
            `);
        }

        await queryRunner.query(`
            ALTER TABLE questions_fields_of_work
            ADD CONSTRAINT fk_questions_fields_of_work_question_id
            FOREIGN KEY (question_id) REFERENCES questions(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE questions_fields_of_work
            DROP FOREIGN KEY fk_questions_fields_of_work_question_id;
        `);

        await queryRunner.query(`
            ALTER TABLE questions_fields_of_work
            ADD CONSTRAINT fk_questions_fields_of_work_question_id
            FOREIGN KEY (question_id) REFERENCES questions(id)
            ON DELETE RESTRICT
            ON UPDATE RESTRICT;
        `);
    }

}
