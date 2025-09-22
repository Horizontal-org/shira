import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Question } from '../../src/modules/question/domain/question.entity';
import { QuestionLibraryController } from '../../src/modules/question_library/controller/question.library.controller';
import { GetLibraryQuestionService } from '../../src/modules/question_library/services/question.library.service';
import { TYPES } from 'src/modules/question_library/interfaces';

describe('QuestionLibrary HTTP (e2e happy paths)', () => {
  let app: INestApplication;
  let questionRepo: any;
  let dataSource: DataSource;

  beforeEach(async () => {
    questionRepo = { find: jest.fn() };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [QuestionLibraryController],
      providers: [
        GetLibraryQuestionService,
        { provide: TYPES.services.IGetLibraryQuestionService, useValue: GetLibraryQuestionService },

        { provide: getRepositoryToken(Question), useValue: questionRepo },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app?.close();
    jest.clearAllMocks();
  });

  it('GET /question/library returns questions (happy path)', async () => {
    // Given 
    const questions = [
      { id: 1, name: 'Phishing email', isPhishing: true, type: 'quiz' },
      { id: 2, name: 'Legit email', isPhishing: false, type: 'demo' },
      { id: 3, name: 'Phishing email', isPhishing: true, type: 'demo' },
    ];
    questionRepo.find.mockResolvedValue(questions);

    const http = app.getHttpAdapter().getInstance();
    const res = await request(http).get('/question/library').expect(200);

    expect(res.body).toEqual(
      expect.arrayContaining([
          expect.objectContaining({ id: 2 }),
          expect.objectContaining({ id: 3 }),
          expect.not.objectContaining({ id: 1 }),
      ]),
    );
  });

  it('GET /question/library returns empty array if no questions apply', async () => {
    questionRepo.find.mockResolvedValue({
      id: 10, name: 'Phishing email', isPhishing: false, type: 'quiz' },
    );

    const http = app.getHttpAdapter().getInstance();
    const res = await request(http).get('/question/library').expect(200);

    expect(res.body).toEqual([]);
  });
});
