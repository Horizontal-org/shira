
export interface IConfirmRegistrationAuthService {
  execute(registrationHash: string): Promise<void>;
}
