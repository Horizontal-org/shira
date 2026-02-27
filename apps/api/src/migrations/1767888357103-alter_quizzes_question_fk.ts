import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterQuizzesQuestionFk1767888357103 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // drop existing fks 
        await queryRunner.query(`
            ALTER TABLE quizzes_questions
            DROP FOREIGN KEY quizzes_questions_ibfk_2
        `);

        await queryRunner.query(`
            ALTER TABLE quizzes_questions
            DROP FOREIGN KEY quizzes_questions_ibfk_1
        `);

        // add new ones with cascade
        await queryRunner.query(`
            ALTER TABLE quizzes_questions
            ADD CONSTRAINT quizzes_questions_ibfk_1
            FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
            ON DELETE CASCADE
        `);

         await queryRunner.query(`
            ALTER TABLE quizzes_questions
            ADD CONSTRAINT quizzes_questions_ibfk_2
            FOREIGN KEY (question_id) REFERENCES questions(id)
            ON DELETE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
