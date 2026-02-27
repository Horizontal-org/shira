import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOutlookToApps1757011767477 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO apps (name, type) VALUES ("Outlook", "email")`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
