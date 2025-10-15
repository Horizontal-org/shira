import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastLoginAtToUsers1760418747000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users
              ADD COLUMN last_login_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users
            DROP COLUMN last_login_at
        `);
    }

}
