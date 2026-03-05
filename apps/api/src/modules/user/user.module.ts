import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { JwtModule } from '@nestjs/jwt';
import { UserCommander } from './commander';
import { UserEntity } from './domain/user.entity';
import { userControllers } from './controllers'
import {
  applicationsUserProviders,
  servicesUserProviders,
  checkPasswordUserApplicationProvider,
  getByIdUserApplicationProvider,
  findByUernameUserServiceProvider,
  createUserApplicationProvider,
  markUserLoginServiceProvider,
  requestPasswordResetUserServiceProvider,
  confirmEmailUpdateUserServiceProvider,
  confirmPasswordUpdateUserServiceProvider
} from './user.providers';
import { SpaceEntity } from '../space/domain/space.entity';
import { PasswordResetEntity } from '../auth/domain/password-reset.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      SpaceEntity,
      PasswordResetEntity
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
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
    createUserApplicationProvider,
    markUserLoginServiceProvider,
    requestPasswordResetUserServiceProvider,
    confirmEmailUpdateUserServiceProvider,
    confirmPasswordUpdateUserServiceProvider
  ],
})
export class UserModule {}
