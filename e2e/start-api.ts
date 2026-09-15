import { DataSource } from 'typeorm';
import { hash } from 'bcrypt';
import { resolve } from 'path';

async function start() {
  // Do not to prepare data outside the isolated test database.
  if (process.env.MYSQL_DATABASE !== 'shira_e2e' || process.env.MYSQL_PORT !== '13307' || process.env.MYSQL_HOST !== '127.0.0.1') {
    throw new Error('Refusing to seed outside the isolated E2E database');
  }

  // Use a separate connection.
  const db = new DataSource({
    type: 'mysql', host: '127.0.0.1', port: 13307,
    username: 'shira_e2e', password: 'shira_e2e', database: 'shira_e2e',
    migrations: [resolve(process.cwd(), 'src/migrations/*.ts')],
    migrationsTableName: 'migrations', charset: 'utf8mb4',
  });

  await db.initialize();

  try {
    // Apply pending application migrations before inserting test data.
    await db.runMigrations({ transaction: 'each' });
    // Create the organization, space, and admin together.
    await db.transaction(async manager => {
      const existing = await manager.query('SELECT id FROM users WHERE email = ?', ['admin@e2e.example.test']);

      // Reuse the seeded account on subsequent runs.
      if (existing.length) return;

      const organization = await manager.query(
        `INSERT INTO organizations (name, organization_type)
         VALUES (?, 'individual')`,
        ['E2E organization'],
      );

      const space = await manager.query(
        `INSERT INTO spaces (name, organization_id, slug, public_id)
         VALUES (?, ?, ?, ?)`,
        [
          'E2E Space',
          organization.insertId,
          'e2e-space',
          'e2e-space-public-id',
        ],
      );

      const user = await manager.query(
        `INSERT INTO users (email, password, is_super_admin)
         VALUES (?, ?, false)`,
        ['admin@e2e.example.test', await hash('E2e-password-123!', 10)],
      );

      await manager.query(
        `INSERT INTO spaces_users (user_id, space_id, role_id)
         SELECT ?, ?, id
         FROM roles
         WHERE name = 'space-admin'
           AND scope = 'space'`,
        [user.insertId, space.insertId],
      );

      await manager.query(
        `INSERT INTO organizations_users (user_id, organization_id, role_id)
         SELECT ?, ?, id
         FROM roles
         WHERE name = 'organization-admin'
           AND scope = 'organization'`,
        [user.insertId, organization.insertId],
      );
    });
  } finally {
    // Release the setup connection even if migrations or seeding fail.
    await db.destroy();
  }

  // Start API after the database and test account are ready.
  await import('../apps/api/src/main');
}

start().catch(error => { console.error(error); process.exitCode = 1; });
