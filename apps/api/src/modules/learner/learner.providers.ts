import { TYPES } from './interfaces';
import { AssignLearnerService } from './services/assign.learner.service';
import { DeleteLearnerService } from './services/delete.learner.service';
import { GetAssignedLearnerService } from './services/get-assigned.learner.service';
import { GetUnassignedLearnerService } from './services/get-unassigned.learner.service';
import { GetLearnerQuizService } from './services/get.learner-quiz.service';
import { GetLearnerService } from './services/get.learner.service';
import { InviteLearnerService } from './services/invite.learner.service';
import { InviteBulkLearnerService } from './services/invite-bulk.learner.service';
import { UnassignLearnerService } from './services/unassign.learner.service';
import { CsvBulkInviteParser } from './parsers/csv-bulk-invite.parser';
import { BulkInviteParserResolver } from './parsers/bulk-invite-parser.resolver';

export const inviteLearnerService = {
  provide: TYPES.services.IInviteLearnerService,
  useClass: InviteLearnerService,
};

export const inviteBulkLearnerService = {
  provide: TYPES.services.IInviteBulkLearnerService,
  useClass: InviteBulkLearnerService,
};

export const assignLearnerService = {
  provide: TYPES.services.IAssignLearnerService,
  useClass: AssignLearnerService,
};

export const unassignLearnerService = {
  provide: TYPES.services.IUnassignLearnerService,
  useClass: UnassignLearnerService,
};

export const getLearnerQuizByHashService = {
  provide: TYPES.services.IGetLearnerQuizService,
  useClass: GetLearnerQuizService,
};

export const getLearnerService = {
  provide: TYPES.services.IGetLearnerService,
  useClass: GetLearnerService
}

export const getAssignedLearnerService = {
  provide: TYPES.services.IGetAssignedLearnerService,
  useClass: GetAssignedLearnerService
}

export const getUnassignedLearnerService = {
  provide: TYPES.services.IGetUnassignedLearnerService,
  useClass: GetUnassignedLearnerService
}

export const deleteLearnerService = {
  provide: TYPES.services.IDeleteLearnerService,
  useClass: DeleteLearnerService
}

export const bulkInviteParserResolver = {
  provide: TYPES.parsers.IBulkInviteParserResolver,
  useClass: BulkInviteParserResolver,
};

export const bulkInviteParsers = {
  provide: TYPES.parsers.IBulkInviteParsers,
  useFactory: (...parsers: CsvBulkInviteParser[]) => parsers,
  inject: [CsvBulkInviteParser],
};

export const serviceLearnerProviders = [
  inviteLearnerService,
  inviteBulkLearnerService,
  CsvBulkInviteParser,
  bulkInviteParserResolver,
  bulkInviteParsers,
  assignLearnerService,
  deleteLearnerService,
  getLearnerService,
  unassignLearnerService,
];

export const serviceLearnerQuizProviders = [
  getLearnerQuizByHashService,
  getAssignedLearnerService,
  getUnassignedLearnerService
]
