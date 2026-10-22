import { expect, test, type Page } from '@playwright/test';
import { E2E_URLS } from '../environment';
import { deleteQuiz, signInAsUser } from './helpers';

test('a user can create a quiz from the template library', async ({ page }) => {
  const quizName = `E2E template quiz ${Date.now()}`;
  let quizId: number | undefined;
  const { template, templateQuestions } = await mockQuizTemplateLibrary(page);

  await signInAsUser(page);

  try {
    // given: the library contains a quiz template with one question
    await page.locator('#create-quiz-button').click();
    await page.locator('#create-quiz-from-template').click();
    await expect(page).toHaveURL(/\/quiz\/templates$/);
    await expect(page.locator('#quiz-card-grid')).toContainText(template.title);

    // when: the user selects the template and configures the new quiz
    await page.locator('#quiz-card-grid')
      .getByRole('button')
      .filter({ hasText: template.title })
      .click();
    await expect(page.getByText(templateQuestions[0].questionName, { exact: true })).toBeVisible();
    await page.locator('#use-quiz-template-button').click();
    await expect(page.locator('#quiz-name-modal')).toBeVisible();
    await page.locator('#quiz-name-input').fill(quizName);
    await page.locator('#quiz-name-modal-primary-button').click();

    await expect(page.locator('#quiz-visibility-modal')).toBeVisible();
    await page.locator('#quiz-visibility-public').check();

    const createRequest = page.waitForRequest(request =>
      request.url().endsWith('/quiz-from-template') && request.method() === 'POST',
    );
    const createResponse = page.waitForResponse(response =>
      response.url().endsWith('/quiz-from-template') && response.request().method() === 'POST',
    );
    await page.locator('#quiz-visibility-modal-primary-button').click();

    // then: Shira creates the quiz
    const request = await createRequest;
    expect(request.postDataJSON()).toEqual({
      title: quizName,
      visibility: 'public',
      questions: [{
        questionName: templateQuestions[0].questionName,
        content: templateQuestions[0].content,
        isPhishing: true,
        appName: 'Gmail',
        images: [],
        explanations: [],
      }],
    });

    const response = await createResponse;
    expect(response.status()).toBe(201);
    ({ quizId } = await response.json() as { quizId: number });

    await expect(page).toHaveURL(new RegExp(`/quiz/${quizId}$`));
    await expect(page.locator('#quiz-title')).toHaveText(quizName);
    await expect(page.getByText(templateQuestions[0].questionName, { exact: true })).toBeVisible();
  } finally {
    await deleteQuiz(page, quizId);
  }
});

const mockQuizTemplateLibrary = async (page: Page) => {
  const template = {
    id: 4242,
    title: 'Phishing fundamentals',
    createdAt: '2026-01-15T12:00:00.000Z',
    author: {
      displayName: 'Shira Team',
      publicSpaceId: 'spc-3KNARAbKcELvIvAYeIXYEBdOfFx',
    },
    langTags: [{ id: 1, name: 'English', code: 'en' }],
    tags: [{ id: 1, name: 'Phishing', slug: 'phishing' }],
  };
  const templateQuestions = [{
    questionId: 5252,
    questionName: 'Unexpected password reset',
    isPhishing: true,
    language: 'English',
    appName: 'Gmail',
    appType: 'email',
    content: '<div>Reset your password immediately.</div>',
    explanations: [],
    images: [],
  }];

  await page.route(`${E2E_URLS.library}/**`, async (route) => {
    const url = new URL(route.request().url());

    if (url.pathname === '/quiz-templates') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: [template], total: 1, page: 1, limit: 20 }),
      });
      return;
    }

    if (url.pathname === `/quiz-templates/${template.id}/questions`) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(templateQuestions),
      });
      return;
    }

    await route.fulfill({
      status: 404,
      contentType: 'application/json',
      body: JSON.stringify({ message: `Unexpected library request: ${url.pathname}` }),
    });
  });

  return { template, templateQuestions };
};
