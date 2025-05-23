import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { authControllers } from './controllers';
import {
  applicationsAuthProviders,
  servicesAuthProviders,
} from './auth.provider';
import { JwtStrategy } from './strategy/jwt.auth.strategy';
import { PassphraseModule } from '../passphrase/passphrase.module';
import { SpaceModule } from '../space/space.module';
import { OrganizationModule } from '../organization/organization.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationEntity } from './domain/registration.entity';
import { SpaceEntity } from '../space/domain/space.entity';
import { PassphraseEntity } from '../passphrase/domain/passphrase.entity';
import { UserEntity } from '../user/domain/user.entity';
import { SpaceUserEntity } from '../space/domain/space-users.entity';
import { OrganizationUsersEntity } from '../organization/domain/organization_users.entity';
import { OrganizationEntity } from '../organization/domain/organization.entity';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,    
    SpaceModule,
    PassphraseModule,
    OrganizationModule,
    TypeOrmModule.forFeature([
      RegistrationEntity,
      SpaceEntity,
      PassphraseEntity,
      UserEntity,
      SpaceUserEntity,
      OrganizationUsersEntity,
      OrganizationEntity
  ]),
  ],
  controllers: [...authControllers],
  providers: [
    ...applicationsAuthProviders,
    ...servicesAuthProviders,
    JwtStrategy,
  ],
})
export class AuthModule {}
