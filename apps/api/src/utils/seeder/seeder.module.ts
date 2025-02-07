import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from 'src/modules/app/domain';
import { FieldOfWork } from 'src/modules/field_of_work/domain';
import { MessageType } from 'src/modules/message_type/domain';
import { Explanation, Question } from 'src/modules/question/domain';
import { typeOrmModuleOptions } from '../../ormconfig';
import { AppSeederService } from './entities/app.seeder';
import { FieldOfWorkSeederService } from './entities/field_of_work.seeder';
import { MessageTypeSeederService } from './entities/message_type.seeder';
import { Seeder } from './seeder.provider';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    TypeOrmModule.forFeature([App]),
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([FieldOfWork]),
    TypeOrmModule.forFeature([Explanation]),
  ],
  providers: [
    Logger,
    Seeder,
    AppSeederService,
    FieldOfWorkSeederService,
  ],
})
export class SeederModule {}
