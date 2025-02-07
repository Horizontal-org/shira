import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { UserCommander } from './commander';
import { UserEntity } from './domain/user.entity';
import { userControllers } from './controllers'
import {
  applicationsUserProviders,
  servicesUserProviders,
  checkPasswordUserApplicationProvider,
  getByIdUserApplicationProvider,
  findByUernameUserServiceProvider,
  createUserApplicationProvider
} from './user.providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    ConsoleModule,
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
    createUserApplicationProvider
  ],
})
export class UserModule {}
