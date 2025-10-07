import * as request from 'supertest';
import { buildQuestionLibraryApp, RawRow } from './utils/buildQuestionLibraryApp';

describe('QuestionLibraryController (e2e with mocked DB)', () => {
  afterEach(() => jest.clearAllMocks());

  it('aggregates and sorts explanations by index', async () => {
    // Given: the DB returns two rows for one question with explanation
    const rawRows: RawRow[] = [
      {
        question_id: 10,
        question_name: 'Sample',
        question_content: '<div/>',
        question_type: 'demo',
        language_name: 'English',
        app_name: 'Gmail',
        is_phising: 1,
        explanation_position: '2',
        explanation_text: 'Second',
        explanation_index: '2'
      },
      {
        question_id: 10,
        question_name: 'Sample',
        question_content: '<div/>',
        question_type: 'demo',
        language_name: 'English',
        app_name: 'Gmail',
        is_phising: 1,
        explanation_position: '1',
        explanation_text: 'First',
        explanation_index: '1'
      },
    ];
    const { app } = await buildQuestionLibraryApp(rawRows);

    // When: the endpoint is called to fetch the question library
    const http = app.getHttpAdapter().getInstance();
    const res = await request(http)
      .get('/question/library')
      .set('x-space', '1')
      .set('x-organization', '1')
      .expect(200);

    // Then: the service aggregates rows by question and sorts explanations by index
    expect(res.body).toEqual([
      {
        id: 10,
        name: 'Sample',
        isPhishing: true,
        type: 'demo',
        content: '<div/>',
        language: 'English',
        appName: 'Gmail',
        explanations: [
          {
            position: 1,
            text: 'First',
            index: 1
          },
          {
            position: 2,
            text: 'Second',
            index: 2
          },
        ],
      },
    ]);

    await app.close();
  });

  it('handles questions without explanations', async () => {
    // Given: the DB returns a row for a question with null explanation fields
    const rawRows: RawRow[] = [
      {
        question_id: 50,
        question_name: 'Apple ID',
        question_content: '',
        question_type: 'demo',
        language_name: 'English',
        app_name: 'Gmail',
        is_phising: 0,
        explanation_position: null,
        explanation_text: null,
        explanation_index: null
      },
    ];
    const { app } = await buildQuestionLibraryApp(rawRows);

    // When: the client fetches the question library
    const http = app.getHttpAdapter().getInstance();
    const res = await request(http)
      .get('/question/library')
      .set('x-space', '1')
      .set('x-organization', '1')
      .expect(200);

    // Then: the response includes the question with an empty explanations array
    expect(res.body).toEqual([
      {
        id: 50,
        name: 'Apple ID',
        isPhishing: false,
        type: 'demo',
        content: '',
        language: 'English',
        appName: 'Gmail',
        explanations: [],
      },
    ]);

    await app.close();
  });

  it('returns an empty array when DB returns no rows', async () => {
    // Given: the DB returns no rows for the query
    const rawRows: RawRow[] = [];
    const { app } = await buildQuestionLibraryApp(rawRows);

    // When: the endpoint is called
    const http = app.getHttpAdapter().getInstance();
    const res = await request(http)
      .get('/question/library')
      .set('x-space', '1')
      .set('x-organization', '1')
      .expect(200);

    // Then: the controller returns an empty list
    expect(res.body).toEqual([]);

    await app.close();
  });
});
