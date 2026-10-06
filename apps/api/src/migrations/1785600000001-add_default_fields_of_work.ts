import { MigrationInterface, QueryRunner } from "typeorm"

export class AddDefaultFieldsOfWork1785600000001 implements MigrationInterface {

  private readonly fieldsOfWork: Array<{ name: string; slug: string }> = [
    { name: 'Human resources', slug: 'human-resources' },
    { name: 'Activist', slug: 'activist' },
  ]

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const field of this.fieldsOfWork) {
      await queryRunner.query(
        `INSERT INTO fields_of_work (name, slug)
         SELECT ?, ?
         WHERE NOT EXISTS (SELECT 1 FROM fields_of_work WHERE slug = ?)`,
        [field.name, field.slug, field.slug]
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const field of this.fieldsOfWork) {
      await queryRunner.query(`DELETE FROM fields_of_work WHERE slug = ?`, [field.slug])
    }
  }

}
