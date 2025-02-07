import { NestFactory } from '@nestjs/core';
import { IndexModule } from './index.module';
import { ResponseNoCacheInterceptor } from './utils/interceptors/no-cache.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(IndexModule);
  app.enableCors();
  app.useGlobalInterceptors(new ResponseNoCacheInterceptor());
  await app.listen(3000);
}
bootstrap();
