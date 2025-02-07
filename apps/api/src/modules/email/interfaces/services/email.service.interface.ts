export interface MailParams {
  subject?: string;
  template: string;
  to: string;
}

export interface IEmailService {
  send(params: MailParams): void;
}
