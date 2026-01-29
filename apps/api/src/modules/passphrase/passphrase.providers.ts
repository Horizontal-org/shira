import { TYPES } from './interfaces';
import { CheckPassphraseService } from './services/check.passphrase.service';
import { CreatePassphraseService } from './services/create.passphrase.service';
import { ListPassphraseService } from './services/list.passphrase.service';
import { UsePassphraseService } from './services/use.passphrase.service';


export const createPassphraseServiceProvider = {
  provide: TYPES.services.ICreatePassphraseService,
  useClass: CreatePassphraseService,
};

export const checkPassphraseServiceProvider = {
  provide: TYPES.services.ICheckPassphraseService,
  useClass: CheckPassphraseService,
};

export const usePassphraseServiceProvider = {
  provide: TYPES.services.IUsePassphraseService,
  useClass: UsePassphraseService,
};

export const listPassphraseServiceProvider = {
  provide: TYPES.services.IListPassphraseService,
  useClass: ListPassphraseService
}

export const servicesPassphraseProviders = [
  createPassphraseServiceProvider,
  checkPassphraseServiceProvider,
  usePassphraseServiceProvider,
  listPassphraseServiceProvider
];
