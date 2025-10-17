import * as request from 'supertest';
import { buildQuestionLibraryApp, RawRow } from './utils/buildQuestionLibraryApp';

describe('QuestionLibraryController (e2e with mocked DB)', () => {
  afterEach(() => jest.clearAllMocks());

  it('aggregates and sorts explanations by index', async () => {
    // Given: the DB returns 2 rows for 1 question with explanations
    const rawRows: RawRow[] = [
      {
        q_id: 10,
        q_name: 'Sample',
        q_is_phishing: 1,
        q_type: 'demo',
        qt_content: '<div/>',
        lang_id: 1,
        lang_name: 'English',
        app_name: 'Gmail',
        e_position: 2,
        e_text: 'Second',
        e_index: 2,
      },
      {
        q_id: 10,
        q_name: 'Sample',
        q_is_phishing: 1,
        q_type: 'demo',
        qt_content: '<div/>',
        lang_id: 1,
        lang_name: 'English',
        app_name: 'Gmail',
        e_position: 1,
        e_text: 'First',
        e_index: 1,
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

    // Then: the service aggregates rows and sorts explanations by index
    expect(res.body).toHaveLength(1);
    expect(res.body).toEqual([
      {
        id: 10,
        name: 'Sample',
        isPhishing: true,
        type: 'demo',
        content: '<div/>',
        language: { id: 1, name: 'English' },
        app: { name: 'Gmail' },
        explanations: [
          { position: 1, text: 'First', index: 1 },
          { position: 2, text: 'Second', index: 2 },
        ],
      },
    ]);

    await app.close();
  });

  it('handles questions without explanations', async () => {
    // Given: the DB returns a row for a question with null explanation fields
    const rawRows: RawRow[] = [
      {
        q_id: 50,
        q_name: 'Apple ID',
        q_is_phishing: 0,
        q_type: 'demo',
        qt_content: '',
        lang_id: 1,
        lang_name: 'English',
        app_name: 'Gmail',
        e_position: null,
        e_text: null,
        e_index: null,
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

    // Then: the response includes the question with empty explanations array
    expect(res.body).toEqual([
      {
        id: 50,
        name: 'Apple ID',
        isPhishing: false,
        type: 'demo',
        content: '',
        language: { id: 1, name: 'English' },
        app: { name: 'Gmail' },
        explanations: [],
      },
    ]);

    await app.close();
  });

  it('returns an empty array when DB returns no rows', async () => {
    // Given: the DB returns no rows
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

  it('creates separate DTOs for the same question when language differs', async () => {
    // Given: the DB returns the same question+app in 2 languages
    const rawRows: RawRow[] = [
      {
        q_id: 71,
        q_name: 'Survey',
        q_is_phishing: 1,
        q_type: 'demo',
        qt_content: '<div/>',
        lang_id: 1,
        lang_name: 'English',
        app_name: 'Gmail',
        e_position: 1,
        e_text: 'Check sender',
        e_index: 1,
      },
      {
        q_id: 71,
        q_name: 'Survey',
        q_is_phishing: 1,
        q_type: 'demo',
        qt_content: '<div/>',
        lang_id: 2,
        lang_name: 'Spanish',
        app_name: 'Gmail',
        e_position: 1,
        e_text: 'Verifica remitente',
        e_index: 1,
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

    // Then: the response contains one DTO per language
    expect(res.body).toHaveLength(2);
    expect(res.body).toEqual([
      {
        id: 71,
        name: 'Survey',
        isPhishing: true,
        type: 'demo',
        content: '<div/>',
        language: { id: 1, name: 'English' },
        app: { name: 'Gmail' },
        explanations: [{ position: 1, text: 'Check sender', index: 1 }],
      },
      {
        id: 71,
        name: 'Survey',
        isPhishing: true,
        type: 'demo',
        content: '<div/>',
        language: { id: 2, name: 'Spanish' },
        app: { name: 'Gmail' },
        explanations: [{ position: 1, text: 'Verifica remitente', index: 1 }],
      },
    ]);

    await app.close();
  });

  it('creates separate DTOs for the same question when app differs', async () => {
    // Given: the DB returns the same question+language but with 2 apps
    const rawRows: RawRow[] = [
      {
        q_id: 88,
        q_name: 'Shipping notice',
        q_is_phishing: 1,
        q_type: 'demo',
        qt_content: '<div/>',
        lang_id: 1,
        lang_name: 'English',
        app_name: 'Gmail',
        e_position: 1,
        e_text: 'Check links',
        e_index: 1,
      },
      {
        q_id: 88,
        q_name: 'Shipping notice',
        q_is_phishing: 1,
        q_type: 'demo',
        qt_content: '<div/>',
        lang_id: 1,
        lang_name: 'English',
        app_name: 'Outlook',
        e_position: 1,
        e_text: 'Check links',
        e_index: 1,
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

    // Then: the response contains one DTO per app
    expect(res.body).toHaveLength(2);
    expect(res.body.map((dto: any) => dto.app.name).sort()).toEqual([
      'Gmail',
      'Outlook',
    ]);

    await app.close();
  });
});
