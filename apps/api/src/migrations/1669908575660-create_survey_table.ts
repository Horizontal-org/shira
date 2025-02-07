import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createSurveyTable1669908575660 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'surveys',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'easyness',
                  type: 'varchar',
                  isNullable: true              
                },
                {
                  name: 'recommend',
                  type: 'varchar',
                  isNullable: true
                },
                {
                  name: 'improvements',
                  type: 'varchar',
                  isNullable: true
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
      await queryRunner.dropTable('surveys');
    }

}
