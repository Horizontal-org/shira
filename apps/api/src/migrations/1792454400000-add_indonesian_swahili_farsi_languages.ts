import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddIndonesianSwahiliFarsiLanguages1792454400000 implements MigrationInterface {
  private readonly languages: Array<{ name: string; code: string }> = [
    { name: 'Indonesian', code: 'id' },
    { name: 'Swahili', code: 'sw' },
    { name: 'Farsi', code: 'fa' },
  ]

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const language of this.languages) {
      await queryRunner.query(
        `INSERT INTO languages (name, code)
         SELECT ?, ?
         WHERE NOT EXISTS (SELECT 1 FROM languages WHERE code = ?)`,
        [language.name, language.code, language.code]
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const language of this.languages) {
      await queryRunner.query('DELETE FROM languages WHERE code = ?', [language.code])
    }
  }
}
