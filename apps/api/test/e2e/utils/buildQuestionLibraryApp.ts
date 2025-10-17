import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';
import { getRepositoryToken } from '@nestjs/typeorm';

import { QuestionLibraryController } from '../../../src/modules/question_library/controller/question.library.controller';
import { GetLibraryQuestionService } from '../../../src/modules/question_library/services/get-question-library.service';
import { TYPES as QUESTION_LIBRARY_TYPES } from '../../../src/modules/question_library/interfaces';
import { TYPES as AUTH_TYPES } from '../../../src/modules/auth/interfaces/types';
import { Question } from '../../../src/modules/question/domain/question.entity';

export type RawRow = {
  q_id: number;
  q_name: string;
  q_is_phishing: number;
  q_type: string;
  qt_content: string | null;
  lang_id: number;
  lang_name: string;
  app_name: string;
  e_position: number | null;
  e_text: string | null;
  e_index: number | null;
};

function rowsToEntities(rawRows: RawRow[]): Question[] {
  const grouped = new Map<string, Question>();

  for (const row of rawRows) {
    const key = `${row.q_id}-${row.app_name ?? ''}`;
    let q = grouped.get(key);
    if (!q) {
      q = {
        id: row.q_id,
        name: row.q_name,
        isPhising: row.q_is_phishing,
        type: row.q_type as any,
        apps: row.app_name ? [{ id: 1, name: row.app_name, type: 'email' }] : [],
        questionTranslations: [],
        explanations: [],
      } as any;
      grouped.set(key, q);
    }

    if (row.lang_id) {
      let qt = (q.questionTranslations as any).find((t: any) => t.languageId === row.lang_id);
      if (!qt) {
        qt = {
          content: row.qt_content ?? '',
          languageId: row.lang_id,
          language: { id: row.lang_id, name: row.lang_name },
        };
        (q.questionTranslations as any).push(qt);
      }
    }

    if (row.e_index != null && row.e_text != null) {
      const exp = {
        index: row.e_index,
        position: row.e_position,
        explanationTranslations: [
          {
            content: row.e_text,
            languageId: row.lang_id,
            language: { id: row.lang_id, name: row.lang_name },
          },
        ],
      };
      (q.explanations as any).push(exp);
    }
  }

  return Array.from(grouped.values());
}

export async function buildQuestionLibraryApp(
  rawRows: RawRow[],
): Promise<{ app: INestApplication; repoMock: any; qb: any }> {
  const entities = rowsToEntities(rawRows);

  const qb: any = {
    leftJoin: jest.fn(() => qb),
    leftJoinAndSelect: jest.fn(() => qb),
    leftJoinAndMapOne: jest.fn(() => qb),
    where: jest.fn(() => qb),
    andWhere: jest.fn(() => qb),
    orderBy: jest.fn(() => qb),
    addOrderBy: jest.fn(() => qb),
    getMany: jest.fn(async () => entities),
  };

  const repoMock = { createQueryBuilder: jest.fn(() => qb) };

  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [QuestionLibraryController],
    providers: [
      {
        provide: QUESTION_LIBRARY_TYPES.services.IGetLibraryQuestionService,
        useClass: GetLibraryQuestionService,
      },
      {
        provide: QUESTION_LIBRARY_TYPES.services.IDuplicateLibraryQuestionService,
        useValue: { execute: jest.fn() },
      },
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
