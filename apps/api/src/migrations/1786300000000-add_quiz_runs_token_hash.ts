import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddQuizRunsTokenHash1786300000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE quiz_runs ADD COLUMN token_hash VARCHAR(64) NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE quiz_runs DROP COLUMN token_hash
        `);
  }
}
