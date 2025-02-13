import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceEntity } from './domain/space.entity';
import { 
  servicesSpaceProviders,
  checkSpaceServiceProvider,
  createSpaceServiceProvider
} from './space.providers';
import { UserEntity } from '../user/domain/user.entity';
import { spaceControllers } from './controllers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        SpaceEntity,
        UserEntity
    ]),
  ],  
  providers: [
    ...servicesSpaceProviders
  ],
  controllers: [...spaceControllers],
  exports: [
    checkSpaceServiceProvider,
    createSpaceServiceProvider
  ]
})
export class SpaceModule {}
