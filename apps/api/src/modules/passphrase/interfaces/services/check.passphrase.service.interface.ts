
export interface ICheckPassphraseService {
  execute(passphrase: string, registrationEmail: string): Promise<boolean>;
}
