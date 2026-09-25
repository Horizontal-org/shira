import { MigrationInterface, QueryRunner } from "typeorm"

export class AddDefaultApps1785600000000 implements MigrationInterface {

  private readonly apps: Array<{ name: string; type: string }> = [
    { name: 'Gmail', type: 'email' },
    { name: 'WhatsApp', type: 'messaging' },
    { name: 'SMS', type: 'messaging' },
    { name: 'Messenger', type: 'messaging' },
    { name: 'Dating App', type: 'messaging' },
  ]

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const app of this.apps) {
      await queryRunner.query(
        `INSERT INTO apps (name, type)
         SELECT ?, ?
         WHERE NOT EXISTS (SELECT 1 FROM apps WHERE name = ?)`,
        [app.name, app.type, app.name]
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const app of this.apps) {
      await queryRunner.query(`DELETE FROM apps WHERE name = ?`, [app.name])
    }
  }

}
