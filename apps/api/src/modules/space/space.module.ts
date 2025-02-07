import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceEntity } from './domain/space.entity';
import { 
  servicesSpaceProviders,
  checkSpaceServiceProvider,
  createSpaceServiceProvider
} from './space.providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        SpaceEntity
    ]),
  ],  
  providers: [
    ...servicesSpaceProviders
  ],
  exports: [
    checkSpaceServiceProvider,
    createSpaceServiceProvider
  ]
})
export class SpaceModule {}
