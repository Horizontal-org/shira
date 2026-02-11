import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCommander } from './commander';
import { UserEntity } from './domain/user.entity';
import { userControllers } from './controllers';
import {
  applicationsUserProviders,
  servicesUserProviders,
  checkPasswordUserApplicationProvider,
  getByIdUserApplicationProvider,
  findByUernameUserServiceProvider,
  createUserApplicationProvider,
  markUserLoginServiceProvider
} from './user.providers';
import { SpaceEntity } from '../space/domain/space.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      SpaceEntity
    ]),
  ],
  providers: [
    UserCommander,
    ...applicationsUserProviders,
    ...servicesUserProviders,
  ],
  controllers: [...userControllers],
  exports: [
    checkPasswordUserApplicationProvider,
    getByIdUserApplicationProvider,
    findByUernameUserServiceProvider,
    createUserApplicationProvider,
    markUserLoginServiceProvider
  ],
})
export class UserModule {}
