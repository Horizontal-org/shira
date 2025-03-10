import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterQuestionColumnTypeType1741292827994 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE questions
            MODIFY type ENUM('demo', 'quiz')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE questions
            MODIFY type VARCHAR(255)
        `);
    }

}
