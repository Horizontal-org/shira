export interface IStarterQuizRestrictionHandlerService {
  execute(organizationId: string): Promise<void>;
}
