import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';
import { getRepositoryToken } from '@nestjs/typeorm';

import { QuestionLibraryController } from '../../../src/modules/question_library/controller/question.library.controller';
import { GetLibraryQuestionService } from '../../../src/modules/question_library/services/get-question-library.service';
import { TYPES as QUESTION_LIBRARY_TYPES } from '../../../src/modules/question_library/interfaces';
import { TYPES as AUTH_TYPES } from '../../../src/modules/auth/interfaces/types';
import { Question } from '../../../src/modules/question/domain/question.entity';

export type RawRow = Record<string, any>;

export function makeQb(rawRows: RawRow[]) {
  const qb: any = {
    leftJoin: jest.fn(() => qb),
    select: jest.fn(() => qb),
    where: jest.fn(() => qb),
    andWhere: jest.fn(() => qb),
    orderBy: jest.fn(() => qb),
    getRawMany: jest.fn(async () => rawRows),
  };
  return qb;
}

export async function buildQuestionLibraryApp(rawRows: RawRow[]): Promise<{ app: INestApplication, repoMock: any, qb: any }> {
  const qb = makeQb(rawRows);
  const repoMock = { createQueryBuilder: jest.fn(() => qb) };

  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [QuestionLibraryController],
    providers: [
      { provide: QUESTION_LIBRARY_TYPES.services.IGetLibraryQuestionService, useClass: GetLibraryQuestionService },
      { provide: QUESTION_LIBRARY_TYPES.services.IDuplicateLibraryQuestionService, useValue: { execute: jest.fn() } },
      { provide: getRepositoryToken(Question), useValue: repoMock },
      { provide: AUTH_TYPES.services.IUserContextService, useValue: mockUserContextService },
    ],
  })
    .overrideGuard(AuthGuard('jwt') as any)
    .useValue({ canActivate: () => true })
    .compile();

  const app = moduleRef.createNestApplication();
  app.use((req: any, _res: any, next: () => void) => {
    req.user = { id: '1', email: 'test@example.com', isSuperAdmin: true };
    next();
  });
  await app.init();

  return { app, repoMock, qb };
}

export const mockUserContextService = {
  validateUserSpaceAccess: jest.fn().mockResolvedValue({
    space: { id: 1, name: 'Test Space', organizationId: 1 },
    spaceRole: 'SpaceAdmin',
    organization: { id: 1, name: 'Test Org' },
    organizationRole: 'OrgAdmin',
    isSuperAdmin: true,
  }),
  validateUserOrganizationAccess: jest.fn().mockResolvedValue({
    organization: { id: 1, name: 'Test Org' },
    organizationRole: 'OrgAdmin',
    isSuperAdmin: true,
  }),
};
