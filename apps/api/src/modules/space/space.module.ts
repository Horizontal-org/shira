import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceEntity } from './domain/space.entity';
import { 
  servicesSpaceProviders,
  checkSpaceServiceProvider,
  createSpaceServiceProvider,
  validateHeaderSpaceServiceProvider
} from './space.providers';
import { UserEntity } from '../user/domain/user.entity';
import { spaceControllers } from './controllers';

@Global()
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
    createSpaceServiceProvider,
    validateHeaderSpaceServiceProvider
  ]
})
export class SpaceModule {}
