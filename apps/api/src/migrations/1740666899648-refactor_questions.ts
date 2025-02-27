import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorQuestions1740666899648 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create pivot table 
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS questions_fields_of_work (
                id INT AUTO_INCREMENT PRIMARY KEY,
                question_id INT NOT NULL,
                field_of_work_id INT NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                FOREIGN KEY (field_of_work_id) REFERENCES fields_of_work(id),
                FOREIGN KEY (question_id) REFERENCES questions(id)
            );
        `);
        
        await queryRunner.query(`
            CREATE INDEX field_of_work_id_and_question_id ON questions_fields_of_work (field_of_work_id, question_id);
        `);


        //add new column type to questions
        await queryRunner.query(`
            ALTER TABLE questions
            ADD COLUMN type VARCHAR(255)
        `);

        // update current questions to type = 'demo'
        const query = "UPDATE questions SET type = 'demo'";
        await queryRunner.query(query);

        //migrate field_of_work_id to new table
        const questions = await queryRunner.query(`
            SELECT id, field_of_work_id FROM questions;
        `);

        for (const question of questions) {
            const query =
            'INSERT INTO questions_fields_of_work (question_id, field_of_work_id) VALUES (?, ?)';
            const values = [question.id, question.field_of_work_id];

            //insert questions into questions_translations
            await queryRunner.query(query, values);
        }


        // get foreign key 
        const fkConstraint = await queryRunner.query(`
            SELECT
                CONSTRAINT_NAME
            FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
            WHERE
                REFERENCED_TABLE_NAME = 'fields_of_work'
            AND
                TABLE_NAME = 'questions';
        `);

        if (fkConstraint && fkConstraint.length > 0) {
            // drop foreign key 
            await queryRunner.query(`ALTER TABLE questions DROP FOREIGN KEY ${fkConstraint[0].CONSTRAINT_NAME}`, );
    
            // drop field_of_work_id from questions
            await queryRunner.query(`
                ALTER TABLE questions
                DROP COLUMN field_of_work_id;
            `);
        } else {
            console.log('!!! COULDNT DELETE field_of_work_id, DELETE MANUALLY')
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
