export interface IDeleteSpaceService {
    execute(id: number): Promise<void>
}