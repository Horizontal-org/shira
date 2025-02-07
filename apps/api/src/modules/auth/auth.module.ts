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
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationEntity } from './domain/registration.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,    
    SpaceModule,
    PassphraseModule,
    TypeOrmModule.forFeature([
      RegistrationEntity
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
