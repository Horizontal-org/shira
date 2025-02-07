import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAppsQuestionsTable1649861047866
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'apps_questions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
         {
            name: 'app_id',
            type: 'int',
          },
          {
            name: 'question_id',
            type: 'int',
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
    const table = await queryRunner.getTable('apps_questions');
    const appForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('app_id') !== -1,
    );
    const questionForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('question_id') !== -1,
    );

    await queryRunner.dropForeignKey('apps_questions', appForeignKey);
    await queryRunner.dropForeignKey('apps_questions', questionForeignKey);
    await queryRunner.dropTable('apps_questions');
  }
}
