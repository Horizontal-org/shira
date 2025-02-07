
export interface ICheckSpaceService {
  execute(name: string): Promise<boolean>;
}
