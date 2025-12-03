import { TYPES } from './interfaces';
import { AssignLearnerService } from './services/assign.learner.service';
import { DeleteLearnerService } from './services/delete.learner.service';
import { GetLearnerQuizService } from './services/get.learner-quiz.service';
import { GetLearnerService } from './services/get.learner.service';
import { InviteLearnerService } from './services/invite.learner.service';
import { UnassignLearnerService } from './services/unassign.learner.service';

export const inviteLearnerService = {
  provide: TYPES.services.IInviteLearnerService,
  useClass: InviteLearnerService,
};

export const inviteBulkLearnerService = {
  provide: TYPES.services.IInviteBulkLearnerService,
  useClass: InviteLearnerService,
};

export const assignLearnerService = {
  provide: TYPES.services.IAssignLearnerService,
  useClass: AssignLearnerService,
};

export const unassignLearnerService = {
  provide: TYPES.services.IUnassignLearnerService,
  useClass: UnassignLearnerService,
};

export const getLearnerQuizByHash = {
  provide: TYPES.services.IGetLearnerQuizService,
  useClass: GetLearnerQuizService,
};

export const getLearner = {
  provide: TYPES.services.IGetLearnerService,
  useClass: GetLearnerService
}

export const deleteLearnerService = {
  provide: TYPES.services.IDeleteLearnerService,
  useClass: DeleteLearnerService
}

export const serviceLearnerProviders = [
  inviteLearnerService,
  inviteBulkLearnerService,
  assignLearnerService,
  deleteLearnerService,
  getLearner,
  unassignLearnerService,
];

export const serviceLearnerQuizProviders = [
  getLearnerQuizByHash
]