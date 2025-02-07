import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTranslationsTables1680624788763 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //create languages table
    await queryRunner.query(`
        CREATE TABLE languages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            code VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
    `);

    await queryRunner.query(`
        INSERT INTO languages (name, code) VALUES 
        ('English', 'en'),
        ('Spanish', 'es'),
        ('French', 'fr');`);
    //create questions_translations table
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS questions_translations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            question_id INT NOT NULL,
            language_id INT NOT NULL,
            content TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
            FOREIGN KEY (question_id) REFERENCES questions(id),
            FOREIGN KEY (language_id) REFERENCES languages(id)
        );
    `);

    //create explanations_translations table
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS explanations_translations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            explanation_id INT NOT NULL,
            language_id INT NOT NULL,
            content TEXT,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
            FOREIGN KEY (explanation_id) REFERENCES explanations(id) ON DELETE CASCADE,
            FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
        );
    `);

    //add questionTranslations indexes
    await queryRunner.query(`
        CREATE INDEX question_id_and_lang_id ON questions_translations (question_id, language_id);
    `);

    //add explanationTranslations indexes
    await queryRunner.query(`
        CREATE INDEX explanation_id_and_lang_id ON explanations_translations (explanation_id, language_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE questions_translations;
        DROP TABLE explanations_translations;
        DROP TABLE languages;
    `);
  }
}
