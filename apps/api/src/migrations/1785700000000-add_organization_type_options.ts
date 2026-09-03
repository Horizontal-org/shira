import { MigrationInterface, QueryRunner } from 'typeorm';

const organizationTypes = [
  'business',
  'cibersecurity',
  'non-profit',
  'individual',
  'educational',
  'healthcare',
];

const legacyOrganizationTypes = [
  'business',
  'cibersecurity',
  'non-profit',
  'individual',
];

export class AddOrganizationTypeOptions1785700000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const enumValues = organizationTypes.map((type) => `'${type}'`).join(', ');

    await queryRunner.query(
      `ALTER TABLE organizations MODIFY organization_type ENUM(${enumValues}) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE passphrases MODIFY organization_type ENUM(${enumValues}) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const enumValues = legacyOrganizationTypes
      .map((type) => `'${type}'`)
      .join(', ');

    await queryRunner.query(
      `ALTER TABLE organizations MODIFY organization_type ENUM(${enumValues}) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE passphrases MODIFY organization_type ENUM(${enumValues}) NULL`,
    );
  }
}
