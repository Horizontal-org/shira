export interface IUsePassphraseService {
  execute(code: string, usedBy: string): Promise<void>;
}
