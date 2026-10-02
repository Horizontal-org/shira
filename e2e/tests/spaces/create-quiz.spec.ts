import { expect, test } from '@playwright/test';

const account = { email: 'admin@e2e.example.test', password: 'E2e-password-123!' };

test('an administrator can create and publish a public quiz from scratch', async ({ page, context }) => {
  const quizName = `E2E quiz ${Date.now()}`;
  let quizId: number | undefined;

  await context.grantPermissions(['clipboard-read', 'clipboard-write'], {
    origin: 'http://localhost:13002',
  });

  // given: an administrator is signed in and viewing the dashboard
  await page.goto('/login');
  await page.locator('#email-input').fill(account.email);
  await page.locator('#password-input').fill(account.password);
  await page.locator('#login-button').click();
  await expect(page.locator('#dashboard-layout')).toBeVisible();

  try {
    // when: the administrator starts a quiz from scratch and gives it a name
    await page.locator('#create-quiz-button').click();
    await page.locator('#create-entity-modal').getByText('Start from scratch').click();
    await expect(page.locator('#quiz-name-modal')).toBeVisible();
    await page.locator('#quiz-name-input').fill(quizName);
    await page.locator('#quiz-name-modal').getByRole('button', { name: 'Next' }).click();

    // and: the administrator makes the quiz public
    await expect(page.locator('#quiz-visibility-modal')).toBeVisible();
    await page.locator('#quiz-visibility-public').check();
    const createResponse = page.waitForResponse(response =>
      response.url().endsWith('/quiz') && response.request().method() === 'POST',
    );
    await page.locator('#quiz-visibility-modal')
      .getByRole('button', { name: 'Create new quiz' })
      .click();

    // then: the API creates the quiz
    const response = await createResponse;
    expect(response.status()).toBe(201);
    ({ quizId } = await response.json() as { quizId: number });
    await expect(page).toHaveURL(new RegExp(`/quiz/${quizId}$`));
    await expect(page.locator('#quiz-title')).toHaveText(quizName);
    await expect(page.getByText('Public', { exact: true })).toBeVisible();
    await expect(page.locator('#copy-link-button')).toBeVisible();
    await expect(page.locator('#copy-link-button')).toBeDisabled();

    // given: the quiz has a question and can therefore be published
    const appsResponse = await page.request.get('http://localhost:13000/app');
    expect(appsResponse.ok()).toBe(true);
    const apps = await appsResponse.json() as Array<{ id: number }>;
    const questionResponse = await page.request.post('http://localhost:13000/quiz/question', {
      data: {
        quizId,
        question: {
          name: 'E2E question',
          content: '<div>E2E question content</div>',
          isPhishing: false,
          app: apps[0].id,
        },
        explanations: [],
      },
    });
    expect(questionResponse.ok()).toBe(true);
    await page.reload();

    // when: the user publishes the quiz
    const publishResponse = page.waitForResponse(response =>
      response.url().endsWith(`/quiz/${quizId}`) && response.request().method() === 'PUT',
    );
    await page.getByRole('switch').click();
    expect((await publishResponse).ok()).toBe(true);
    await expect(page.getByRole('switch')).toHaveAttribute('aria-checked', 'true');

    // then: the public link can be copied to the clipboard
    await expect(page.locator('#copy-link-button')).toBeEnabled();
    await page.locator('#copy-link-button').click();
    await expect(page.getByText('The public quiz link has been copied to your clipboard.')).toBeVisible();

    const quizResponse = await page.request.get(`http://localhost:13000/quiz/${quizId}`);
    expect(quizResponse.ok()).toBe(true);
    const quiz = await quizResponse.json() as { hash: string };
    const publicQuizUrl = `http://localhost:13001/quiz/${quiz.hash}`;
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toBe(publicQuizUrl);

    // and: following the copied link opens the published quiz in the public app
    const publicPage = await context.newPage();
    await publicPage.goto(publicQuizUrl);
    await expect(publicPage).toHaveURL(publicQuizUrl);
    await expect(publicPage.getByRole('heading', { name: quizName })).toBeVisible();
    await publicPage.close();
  } finally {
    if (quizId !== undefined) {
      const response = await page.request.delete(`http://localhost:13000/quiz/${quizId}`);
      expect(response.ok()).toBe(true);
    }
  }
});
