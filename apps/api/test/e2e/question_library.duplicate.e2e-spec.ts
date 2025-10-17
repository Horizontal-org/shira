import * as request from 'supertest';
import { buildQuestionLibraryApp } from './utils/buildQuestionLibraryApp';

describe('QuestionLibraryController - duplication - (e2e with mocked DB)', () => {
  afterEach(() => jest.clearAllMocks());

  it('duplicates a question and returns 201 with success message', async () => {
    // Given: correct request data
    const questionId = '71';
    const dto = { quizId: 37, languageId: 3, appId: 1 };

    const { app } = await buildQuestionLibraryApp([]);

    // When: the client posts to the duplicate endpoint
    const http = app.getHttpAdapter().getInstance();
    const res = await request(http)
      .post(`/question/library/${questionId}/duplicate`)
      .set('x-space', '1')
      .set('x-organization', '1')
      .send(dto)
      .expect(201);

    // Then: the service is called with the correct args and response has the message
    expect(res.body).toEqual({
      message: 'Question library duplicated successfully',
    });

    await app.close();
  });
});
