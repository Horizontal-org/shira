
export interface ICheckPassphraseService {
  execute(passphrase: string): Promise<boolean>;
}
