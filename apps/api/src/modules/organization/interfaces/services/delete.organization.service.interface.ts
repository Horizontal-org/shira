export interface IDeleteOrganizationService {
    execute(id: number): Promise<void>;
}