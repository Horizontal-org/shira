import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRegistrationsTable1730733187602 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'registrations',
              columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'space_name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar'
                },
                {
                    name: 'password',
                    type: 'varchar'
                },            
                {
                    name: 'passphrase',
                    type: 'varchar'
                },
                {
                    name: 'invitation_hash',
                    type: 'varchar'
                },
                {
                    name: 'expires_at',
                    type: 'timestamp'
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
        await queryRunner.dropTable('registrations');
    }

}
