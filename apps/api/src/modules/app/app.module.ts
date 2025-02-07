import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appControllers } from './controllers'
import { App as AppEntity } from './domain';

@Module({
  imports: [TypeOrmModule.forFeature([AppEntity])],
  controllers: [...appControllers]
})
export class AppModule {}
