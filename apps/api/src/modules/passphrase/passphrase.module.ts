import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PassphraseEntity } from './domain/passphrase.entity';
import { 
  servicesPassphraseProviders,
  checkPassphraseServiceProvider,
  usePassphraseServiceProvider
} from './passphrase.providers';

import { passphraseControllers } from './controllers';

@Module({
  imports: [
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
