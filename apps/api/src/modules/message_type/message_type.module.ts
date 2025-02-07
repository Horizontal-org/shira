import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessageType as MessageTypeEntity } from './domain';

@Module({
  imports: [TypeOrmModule.forFeature([MessageTypeEntity])],
})
export class MessageTypeModule {}
