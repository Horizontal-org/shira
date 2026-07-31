import { MigrationInterface, QueryRunner } from 'typeorm';

export class WidenSpacesPublicId1782000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE spaces
        MODIFY COLUMN public_id VARCHAR(31) NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE spaces
        MODIFY COLUMN public_id VARCHAR(30) NOT NULL
    `);
  }
}
