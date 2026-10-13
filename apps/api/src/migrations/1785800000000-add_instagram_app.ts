import { MigrationInterface, QueryRunner } from "typeorm"

export class AddInstagramApp1785800000000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO apps (name, type)
       SELECT ?, ?
       WHERE NOT EXISTS (SELECT 1 FROM apps WHERE name = ?)`,
      ['Instagram', 'messaging', 'Instagram']
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM apps WHERE name = ?`, ['Instagram'])
  }

}
