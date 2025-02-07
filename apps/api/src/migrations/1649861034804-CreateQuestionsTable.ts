import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateQuestionsTable1649861034804 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'questions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },          
          {
            name: 'is_phising',
            type: 'int',
          },          
          {
            name: 'content',
            type: 'text',
          },
          {
            name: 'field_of_work_id',
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

    await queryRunner.createForeignKey(
      'questions',
      new TableForeignKey({
        columnNames: ['field_of_work_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'fields_of_work',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('questions');
    const fieldOfWorkForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('field_of_work_id') !== -1,
    );

    await queryRunner.dropForeignKey('questions', fieldOfWorkForeignKey);
    await queryRunner.dropTable('questions');
  }
}
