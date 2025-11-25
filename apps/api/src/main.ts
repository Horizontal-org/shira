import { NestFactory } from '@nestjs/core';
import { IndexModule } from './index.module';
import { ResponseNoCacheInterceptor } from './utils/interceptors/no-cache.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ApiLogger } from './utils/logger/api-logger.service';
import { GlobalExceptionFilter } from './utils/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(IndexModule,
    { bufferLogs: true }
  );

  const logger = new ApiLogger('API');
  app.useLogger(logger);

  app.enableCors();
  app.useGlobalInterceptors(new ResponseNoCacheInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
