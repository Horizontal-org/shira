import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { Seeder } from './seeder.provider';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then(async (appContext) => {
      const seeder = appContext.get(Seeder);
      await seeder.seed();
      appContext.close();
    })
    .catch((error) => {
      throw error;
    });
}
bootstrap();
