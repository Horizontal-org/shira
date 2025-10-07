import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthGuard } from '@nestjs/passport';
import { QuestionLibraryController } from '../../src/modules/question_library/controller/question.library.controller';
import { TYPES as QUESTION_LIBRARY_TYPES } from '../../src/modules/question_library/interfaces';
import { TYPES as AUTH_TYPES } from '../../src/modules/auth/interfaces/types';

const mockGetLibraryQuestionService = {
  execute: jest.fn(),
};

const mockUserContextService = {
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

describe('QuestionLibraryController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [QuestionLibraryController],
      providers: [
        {
          provide: QUESTION_LIBRARY_TYPES.services.IGetLibraryQuestionService,
          useValue: mockGetLibraryQuestionService,
        },
        {
          provide: AUTH_TYPES.services.IUserContextService,
          useValue: mockUserContextService,
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt') as any)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleRef.createNestApplication();

    app.use((req: any, _res: any, next: () => void) => {
      req.user = { id: '1', email: 'test@example.com', isSuperAdmin: true };
      next();
    });

    await app.init();
  });

  afterEach(async () => {
    await app?.close();
    jest.clearAllMocks();
  });

  it('GET /question/library returns questions (happy path)', async () => {
    // Given: service returns multiple explanation rows for a single question
    const dtoRows = [
      {
        id: 1,
        name: 'Phishing - Youth Empowerment',
        isPhishing: true,
        type: 'demo',
        language: 'English',
        appName: 'Gmail',
        explanations: [
          { position: 1, text: 'Lorem ipsum', index: 1 },
        ],
      },
    ];
    mockGetLibraryQuestionService.execute.mockResolvedValueOnce(dtoRows as any);

    // When: a GET request is performed
    const http = app.getHttpAdapter().getInstance();
    const res = await request(http)
      .get('/question/library')
      .set('x-space', '1')
      .set('x-organization', '1')
      .expect(200);

    // Then: service is called and response matches mocked rows
    expect(mockGetLibraryQuestionService.execute).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual(dtoRows);
  });

  it('GET /question/library returns multiple questions', async () => {
    // Given: the mock service returns multiple DTO rows for different questions
    const dtoRows = [
      {
        id: 1,
        name: 'Phishing - Youth Empowerment',
        isPhishing: true,
        type: 'demo',
        language: 'English',
        appName: 'Gmail',
        explanations: [{ position: 1, text: 'First explanation', index: 1 }],
      },
      {
        id: 2,
        name: 'Suspicious SMS - Delivery Notice',
        isPhishing: true,
        type: 'demo',
        language: 'Spanish',
        appName: 'SMS',
        explanations: [{ position: 1, text: 'Beware of links', index: 1 }],
      },
    ];
    mockGetLibraryQuestionService.execute.mockResolvedValueOnce(dtoRows as any);

    // When: a GET request is performed
    const http = app.getHttpAdapter().getInstance();
    const res = await request(http)
      .get('/question/library')
      .set('x-space', '1')
      .set('x-organization', '1')
      .expect(200);

    // Then: the controller returns all questions
    expect(mockGetLibraryQuestionService.execute).toHaveBeenCalledTimes(1);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(2);
    expect(res.body).toEqual(dtoRows);
  });

  it('GET /question/library returns empty array when no data', async () => {
    // Given: service returns empty array
    mockGetLibraryQuestionService.execute.mockResolvedValueOnce([]);

    // When: a GET request is performed
    const http = app.getHttpAdapter().getInstance();
    const res = await request(http)
      .get('/question/library')
      .set('x-space', '1')
      .set('x-organization', '1')
      .expect(200);

    // Then: response is empty array
    expect(res.body).toEqual([]);
  });
});
