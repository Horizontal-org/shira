import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddExpiredToPassphrases1746729527784 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "passphrases",
            new TableColumn({
                name: "expired",
                type: "boolean",
                default: false
            }),
        );

        // invalidate all existing passphrases
        await queryRunner.query(`
            UPDATE passphrases 
            SET expired = true
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("passphrases", "expired");
    }
}
