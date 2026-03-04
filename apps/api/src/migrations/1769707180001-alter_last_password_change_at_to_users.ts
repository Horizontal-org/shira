import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastPasswordChangeAtToUsers1769707180001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users
              ADD COLUMN last_password_change_at TIMESTAMP NULL DEFAULT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users
            DROP COLUMN last_password_change_at
        `);
    }

}
