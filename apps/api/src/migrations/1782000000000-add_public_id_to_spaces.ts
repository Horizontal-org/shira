import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from "typeorm"
import KSUID = require("ksuid")

export class AddPublicIdToSpaces1782000000000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "spaces",
      new TableColumn({
        name: "public_id",
        type: "varchar",
        length: "27",
        isNullable: true,
      })
    )

    const spaces: { id: number }[] = await queryRunner.query(`SELECT id FROM spaces`)

    for (const space of spaces) {
      const publicId = KSUID.randomSync().string
      await queryRunner.query(
        `UPDATE spaces SET public_id = ? WHERE id = ?`,
        [publicId, space.id]
      )
    }

    await queryRunner.changeColumn(
      "spaces",
      "public_id",
      new TableColumn({
        name: "public_id",
        type: "varchar",
        length: "27",
        isNullable: false,
      })
    )

    await queryRunner.createIndex(
      "spaces",
      new TableIndex({
        name: "IDX_SPACE_PUBLIC_ID",
        columnNames: ["public_id"],
        isUnique: true
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("spaces", "IDX_SPACE_PUBLIC_ID")
    await queryRunner.dropColumn("spaces", "public_id")
  }

}
