import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateImagesTable1748976367455 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'question_images',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'relative_path',
                        type: 'varchar',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'question_id',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'quiz_id',
                        type: 'int'
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
            "question_images",
            new TableForeignKey({
                columnNames: ["question_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "questions",
                onDelete: "CASCADE",
            }),
        )

        await queryRunner.createForeignKey(
            "question_images",
            new TableForeignKey({
                columnNames: ["quiz_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "quizzes",
                onDelete: "CASCADE",
            }),
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('question_images');
    }

}
