import { PassphraseEntity } from '../../domain/passphrase.entity';

export interface ICreatePassphraseService {
  execute(amount: number): Promise<PassphraseEntity[]>;
}
