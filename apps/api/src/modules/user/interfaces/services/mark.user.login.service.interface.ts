export interface IMarkUserLoginService {
    execute(userId: string): Promise<void>;
}