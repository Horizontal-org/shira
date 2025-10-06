import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Question } from '../../src/modules/question/domain/question.entity';
import { QuestionLibraryController } from '../../src/modules/question_library/controller/question.library.controller';
import { TYPES } from 'src/modules/question_library/interfaces';
import { TYPES as AUTH_TYPES } from '../../src/modules/auth/interfaces';
import { IUserContextService } from '../../src/modules/auth/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../src/modules/auth/guards/roles.guard';

describe('QuestionLibrary HTTP (e2e happy paths)', () => {
  let app: INestApplication;
  let questionRepo: any;
  let mockService: any;

  beforeEach(async () => {
    questionRepo = { find: jest.fn() };

    const mockUserContextService: IUserContextService = {
      validateUserSpaceAccess: jest.fn().mockResolvedValue({
        space: { id: 1, name: 'Test Space', organizationId: 1 },
        spaceRole: 'SpaceAdmin',
        organization: { id: 1, name: 'Test Org' },
        organizationRole: 'Admin'
      }),
      validateUserOrganizationAccess: jest.fn().mockResolvedValue({
        organization: { id: 1, name: 'Test Org' },
        organizationRole: 'Admin'
      })
    };

    mockService = {
      execute: jest.fn().mockResolvedValue([])
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [QuestionLibraryController],
      providers: [
        { provide: TYPES.services.IGetLibraryQuestionService, useValue: mockService },
        { provide: getRepositoryToken(Question), useValue: questionRepo },
        { provide: AUTH_TYPES.services.IUserContextService, useValue: mockUserContextService },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app?.close();
    jest.clearAllMocks();
  });

  it('GET /question/library returns questions (happy path)', async () => {
    // Given: the service returns a predefined list of questions
    const expectedQuestions = [
      { id: 2, name: 'Legit email', isPhishing: false, type: 'demo' },
      { id: 3, name: 'Phishing email', isPhishing: true, type: 'demo' },
    ];
    mockService.execute.mockResolvedValue(expectedQuestions);

    // When: making a GET request to the endpoint
    const http = app.getHttpAdapter().getInstance();
    const res = await request(http).get('/question/library').expect(200);

    // Then: the response matches the expected questions
    expect(res.body).toEqual(expectedQuestions);
  });

  it('GET /question/library returns empty array if no questions apply', async () => {
    // Given: the service resolves with an empty list
    mockService.execute.mockResolvedValue([]);

    // When: making a GET request to the endpoint
    const http = app.getHttpAdapter().getInstance();
    const res = await request(http).get('/question/library').expect(200);

    // Then: the response body is an empty array
    expect(res.body).toEqual([]);
  });
});
