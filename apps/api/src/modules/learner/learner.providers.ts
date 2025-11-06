import { TYPES } from './interfaces';
import { AssignLearnerService } from './services/assign.learner.service';
import { InviteLearnerService } from './services/invite.learner.service';

export const inviteLearnerService = {
  provide: TYPES.services.IInviteLearnerService,
  useClass: InviteLearnerService,
};

export const assignLearnerService = {
  provide: TYPES.services.IAssignLearnerService,
  useClass: AssignLearnerService,
};

export const serviceLearnerProviders = [
  inviteLearnerService,
  assignLearnerService
];
