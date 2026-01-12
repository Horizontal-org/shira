import { CreatePassphraseController } from './create.passphrase.controller';
import { CheckExpiredPassphraseController } from './check-expired.passphrase.controller';
import { ListPassphraseController } from './list.passphrase.controller';

export const passphraseControllers = [
  CreatePassphraseController, 
  CheckExpiredPassphraseController,
  ListPassphraseController
];
