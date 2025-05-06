import { PassphraseEntity } from "../../domain/passphrase.entity";

export interface IUsePassphraseService {
  execute(code: string, usedBy: string): Promise<PassphraseEntity>;
}
