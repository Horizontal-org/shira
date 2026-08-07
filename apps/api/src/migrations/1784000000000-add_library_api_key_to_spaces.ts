import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddLibraryApiKeyToSpaces1784000000000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "spaces",
      new TableColumn({
        name: "library_api_key",
        type: "varchar",
        length: "255",
        isNullable: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("spaces", "library_api_key")
  }

}
