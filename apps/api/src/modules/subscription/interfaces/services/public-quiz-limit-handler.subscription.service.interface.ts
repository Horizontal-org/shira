export interface IPublicQuizLimitHandlerService {
  execute(organizationId: string): Promise<void>;
}
