import { NestFactory } from '@nestjs/core';
import { IndexModule } from './index.module';
import { UserCommander } from './modules/user/commander/user.commander';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(IndexModule, {
    logger: ['log', 'warn', 'error'],
  });

  try {
    const args = process.argv.slice(2);

    if (args[0] === 'users' && args[1] === 'create' && args[2]) {
      const username = args[2];
      await app.get(UserCommander).createUser(username);
      await app.close();
      process.exit(0);
    }

    console.log('Unknown command.');
    console.log('Usage: npm run console:dev -- users create <username>');

    await app.close();
    process.exit(1);
  } catch (e) {
    console.error(e);
    try {
      await app.close();
    } finally {
      process.exit(1);
    }
  }
}

bootstrap();
