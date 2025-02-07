import { TYPES } from './interfaces';
import { EmailService } from './services/email.service';


export const emailServiceProvider = {
  provide: TYPES.services.IEmailService,
  useClass: EmailService,
};


export const servicesPassphraseProviders = [
  emailServiceProvider
];
