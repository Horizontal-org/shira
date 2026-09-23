import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateNoteImages1786100000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE note_images (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                relative_path VARCHAR(255) NOT NULL,
                note_id INT NULL,
                quiz_id INT NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT FK_note_images_note FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
                CONSTRAINT FK_note_images_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE note_images`)
    }

}
