import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddSlugToSpace1745249018749 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "passphrases",
      new TableColumn({
        name: "slug",
        type: "varchar",
        length: "150",
        isNullable: true
      })
    )

    await queryRunner.addColumn(
      "spaces",
      new TableColumn({
        name: "slug",
        type: "varchar",
        length: "150",
        isNullable: true
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("passphrases", "slug");
        
    await queryRunner.dropColumn("spaces", "slug");
  }

}
