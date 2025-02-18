import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PassphraseEntity } from './domain/passphrase.entity';
import { 
  servicesPassphraseProviders,
  checkPassphraseServiceProvider,
  usePassphraseServiceProvider
} from './passphrase.providers';

import { passphraseControllers } from './controllers';
import { SpaceModule } from '../space/space.module';

@Module({
  imports: [
    SpaceModule,
    TypeOrmModule.forFeature([
        PassphraseEntity
    ]),
  ],
  controllers: [...passphraseControllers],
  providers: [
    ...servicesPassphraseProviders
  ],
  exports: [
    checkPassphraseServiceProvider,
    usePassphraseServiceProvider
  ]
})
export class PassphraseModule {}
