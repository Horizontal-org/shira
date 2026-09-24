import { MigrationInterface, QueryRunner } from "typeorm"

export class AddQuizItemsEntityIndex1786200000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // entity_id is polymorphic (no FK, so no implicit index), lookups by entity go through this
        await queryRunner.query(`
            CREATE INDEX quiz_items_entity_type_entity_id ON quiz_items (entity_type, entity_id)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX quiz_items_entity_type_entity_id ON quiz_items
        `)
    }

}
