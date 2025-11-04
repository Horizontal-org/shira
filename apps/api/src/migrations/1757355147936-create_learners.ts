import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateLearnersTable1757355147936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'learners',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'space_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['invited', 'registered', 'assigned'],
            isNullable: false,
          },
          {
            name: 'assigned_by',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'invitation_token',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'invitation_token_expires_at',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'invited_at',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'registered_at',
            type: 'datetime',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Foreign keys
    await queryRunner.createForeignKey(
      'learners',
      new TableForeignKey({
        name: 'fk_learners_space',
        columnNames: ['space_id'],
        referencedTableName: 'spaces',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'learners',
      new TableForeignKey({
        name: 'fk_learners_assigned_by',
        columnNames: ['assigned_by'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    // Indexes
    await queryRunner.createIndex(
      'learners',
      new TableIndex({
        name: 'uq_learners_space_email',
        columnNames: ['space_id', 'email'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('learners', 'uq_learners_space_email');
    await queryRunner.dropForeignKey('learners', 'fk_learners_assigned_by');
    await queryRunner.dropForeignKey('learners', 'fk_learners_space');
    await queryRunner.dropTable('learners');
  }
}
