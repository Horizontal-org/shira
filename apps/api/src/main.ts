import { NestFactory } from '@nestjs/core';
import { IndexModule } from './index.module';
import { ResponseNoCacheInterceptor } from './utils/interceptors/no-cache.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ApiLogger } from './utils/logger/api-logger.service';
import { LoggingInterceptor } from './utils/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(IndexModule);

  const apiLogger = new ApiLogger();

  app.enableCors();

  app.useGlobalInterceptors(new ResponseNoCacheInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor(apiLogger));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
