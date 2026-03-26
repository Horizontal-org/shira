export interface IValidateQuizNameService {
  execute(name: string, spaceId: number): Promise<void>;
}
