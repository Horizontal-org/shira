import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateLearnersQuizzesTable1757355147937 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'learners_quizzes',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'quiz_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'learner_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['assigned', 'in_progress', 'completed'],
            isNullable: false,
          },
          {
            name: 'hash',
            type: 'varchar',
            length: '255',
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
            name: 'assigned_at',
            type: 'datetime',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Foreign keys
    await queryRunner.createForeignKey(
      'learners_quizzes',
      new TableForeignKey({
        name: 'fk_learners_quizzes_quiz',
        columnNames: ['quiz_id'],
        referencedTableName: 'quizzes',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'learners_quizzes',
      new TableForeignKey({
        name: 'fk_learners_quizzes_learner',
        columnNames: ['learner_id'],
        referencedTableName: 'learners',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    // Indexes
    await queryRunner.createIndex(
      'learners_quizzes',
      new TableIndex({
        name: 'idx_learners_quizzes_quiz',
        columnNames: ['quiz_id'],
      }),
    );

    await queryRunner.createIndex(
      'learners_quizzes',
      new TableIndex({
        name: 'idx_learners_quizzes_learner',
        columnNames: ['learner_id'],
      }),
    );

    await queryRunner.createIndex(
      'learners_quizzes',
      new TableIndex({
        name: 'uq_learners_quizzes_unique_assignment',
        columnNames: ['quiz_id', 'learner_id'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('learners_quizzes', 'uq_learners_quizzes_unique_assignment');
    await queryRunner.dropIndex('learners_quizzes', 'idx_learners_quizzes_learner');
    await queryRunner.dropIndex('learners_quizzes', 'idx_learners_quizzes_quiz');
    await queryRunner.dropForeignKey('learners_quizzes', 'fk_learners_quizzes_quiz');
    await queryRunner.dropForeignKey('learners_quizzes', 'fk_learners_quizzes_learner');
    await queryRunner.dropTable('learners_quizzes');
  }
}
