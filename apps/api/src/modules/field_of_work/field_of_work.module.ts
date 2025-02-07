import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { fieldsOfWorkControllers } from './controllers';

import { FieldOfWork as FieldOfWorkEntity } from './domain';

@Module({
  imports: [TypeOrmModule.forFeature([FieldOfWorkEntity])],
  controllers: [...fieldsOfWorkControllers]
})
export class FieldOfWorkModule {}
