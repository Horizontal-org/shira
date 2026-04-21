export interface IStarterQuizRestrictionHandlerService {
  execute(organizationId: string, spaceId: number): Promise<void>;
}
