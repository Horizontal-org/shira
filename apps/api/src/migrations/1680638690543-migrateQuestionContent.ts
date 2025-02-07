import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrateQuestionContent1680638690543 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //add new column language_id to questions with foreign key to languages
    await queryRunner.query(`
        ALTER TABLE questions
        ADD COLUMN language_id INT,
        ADD FOREIGN KEY (language_id) REFERENCES languages(id);
    `);

    // get language id for english
    const languageId = await queryRunner.query(`
        SELECT id FROM languages WHERE code = 'en';
    `);

    //insert english language id into questions
    await queryRunner.query(`
        UPDATE questions SET language_id = ${languageId[0].id};
    `);

    //get all questions
    const questions = await queryRunner.query(`
        SELECT id, content FROM questions;
    `);

    //insert questions into questions_translations
    for (const question of questions) {
      const query =
        'INSERT INTO questions_translations (question_id, language_id, content) VALUES (?, ?, ?)';
      const values = [question.id, languageId[0].id, question.content];

      //insert questions into questions_translations
      await queryRunner.query(query, values);
    }

    //get all explanations
    const explanations = await queryRunner.query(`
        SELECT id, explanation_text FROM explanations;
    `);

    //insert explanations into explanations_translations
    for (const explanation of explanations) {
      const query =
        'INSERT INTO explanations_translations (explanation_id, language_id, content) VALUES (?, ?, ?)';
      const values = [
        explanation.id,
        languageId[0].id,
        explanation.explanation_text,
      ];
      await queryRunner.query(query, values);
    }

    // //drop content column from questions
    // await queryRunner.query(`
    //     ALTER TABLE questions
    //     DROP COLUMN content;
    // `);

    // // drop explanation_text column from explanations
    // await queryRunner.query(`
    //     ALTER TABLE explanations
    //     DROP COLUMN explanation_text;
    // `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //drop column language_id from questions
    await queryRunner.query(`
        ALTER TABLE questions
        DROP COLUMN language_id;
    `);
  }
}
