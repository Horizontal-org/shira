import { PassphraseEntity } from '../../domain/passphrase.entity';

export interface IListPassphraseService {
  execute(): Promise<PassphraseEntity[]>;
}
