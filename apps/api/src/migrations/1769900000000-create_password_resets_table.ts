import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePasswordResetsTable1769900000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'password_resets',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'reset_hash',
                        type: 'varchar',
                    },
                    {
                        name: 'expires_at',
                        type: 'timestamp',
                    },
                    {
                        name: 'used_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('password_resets');
    }
}
