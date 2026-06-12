import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddHasResultsToSpaces1778000000000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "spaces",
      new TableColumn({
        name: "has_results",
        type: "boolean",
        default: true,
        isNullable: false,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("spaces", "has_results")
  }

}
