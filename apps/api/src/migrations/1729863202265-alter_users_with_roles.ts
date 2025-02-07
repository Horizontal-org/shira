import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUsersWithRoles1729863202265 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "role",
                type: "varchar",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
