import { MigrationInterface, QueryRunner } from 'typeorm'

const tables = [
  'apps',
  'explanations',
  'explanations_translations',
  'fields_of_work',
  'languages',
  'learners',
  'learners_quizzes',
  'message_types',
  'organizations',
  'organizations_users',
  'passphrases',
  'password_resets',
  'question_images',
  'question_runs',
  'questions',
  'questions_fields_of_work',
  'questions_translations',
  'quiz_runs',
  'quizzes',
  'quizzes_questions',
  'registrations',
  'roles',
  'spaces',
  'spaces_users',
  'stats',
  'surveys',
  'users',
]

export class ConvertToUtf8mb41781740800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER DATABASE \`${process.env.MYSQL_DATABASE}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    )

    for (const table of tables) {
      await queryRunner.query(
        `ALTER TABLE \`${table}\` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER DATABASE \`${process.env.MYSQL_DATABASE}\` CHARACTER SET latin1 COLLATE latin1_swedish_ci`
    )

    for (const table of tables) {
      await queryRunner.query(
        `ALTER TABLE \`${table}\` CONVERT TO CHARACTER SET latin1 COLLATE latin1_swedish_ci`
      )
    }
  }
}
