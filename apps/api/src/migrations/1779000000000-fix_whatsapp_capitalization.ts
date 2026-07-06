import { MigrationInterface, QueryRunner } from "typeorm"

export class FixWhatsappCapitalization1779000000000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE apps SET name = 'WhatsApp' WHERE name = 'Whatsapp'`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE apps SET name = 'Whatsapp' WHERE name = 'WhatsApp'`)
  }

}
