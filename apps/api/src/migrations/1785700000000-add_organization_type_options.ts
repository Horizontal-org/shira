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

const newOrganizationTypes = organizationTypes.filter(
  (type) => !legacyOrganizationTypes.includes(type),
);

export class AddOrganizationTypeOptions1785700000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    // This is for backward compatibility
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
    const newEnumValues = newOrganizationTypes
      .map((type) => `'${type}'`)
      .join(', ');

    await queryRunner.query(
      `UPDATE organizations SET organization_type = NULL WHERE organization_type IN (${newEnumValues})`,
    );
    await queryRunner.query(
      `UPDATE passphrases SET organization_type = NULL WHERE organization_type IN (${newEnumValues})`,
    );

    await queryRunner.query(
      `ALTER TABLE organizations MODIFY organization_type ENUM(${enumValues}) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE passphrases MODIFY organization_type ENUM(${enumValues}) NULL`,
    );
  }
}
