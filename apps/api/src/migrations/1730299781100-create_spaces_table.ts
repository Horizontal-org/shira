import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSpacesTable1730299781100 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
              name: 'spaces',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'name',
                  type: 'varchar',
                },
                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()',
                },
              ],
            }),
            true,
          );

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS spaces_users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                space_id INT NOT NULL,
                user_id INT NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                FOREIGN KEY (space_id) REFERENCES spaces(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `);
        
        await queryRunner.query(`
            CREATE INDEX user_id_and_space_id ON spaces_users (space_id, user_id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE spaces_users;
            DROP TABLE spaces;
        `);
    }

}
