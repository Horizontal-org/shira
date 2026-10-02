import { expect, test } from '@playwright/test';
import { deleteQuiz, signInAsUser } from './helpers';

test('a user can duplicate a quiz', async ({ page }) => {
  const quizName = `E2E duplicate quiz ${Date.now()}`;
  const duplicatedQuizName = `Copy of ${quizName}`;
  const questionName = 'E2E duplication question';
  let quizId: number | undefined;
  let duplicatedQuizId: number | undefined;

  // given: a user is signed in and has a quiz with 1 question
  await signInAsUser(page);

  try {
    const createResponse = await page.request.post('http://localhost:13000/quiz', {
      data: { title: quizName, visibility: 'public' },
    });
    expect(createResponse.status()).toBe(201);
    ({ quizId } = await createResponse.json() as { quizId: number });

    const appsResponse = await page.request.get('http://localhost:13000/app');
    expect(appsResponse.ok()).toBe(true);
    const apps = await appsResponse.json() as Array<{ id: number }>;
    const questionResponse = await page.request.post('http://localhost:13000/quiz/question', {
      data: {
        quizId,
        question: {
          name: questionName,
          content: '<div>E2E duplication question content</div>',
          isPhishing: false,
          app: apps[0].id,
        },
        explanations: [],
      },
    });
    expect(questionResponse.ok()).toBe(true);

    await page.goto(`/quiz/${quizId}`);
    await expect(page.locator('#quiz-title')).toHaveText(quizName);

    // when: the user duplicates the quiz
    await page.locator('#duplicate-quiz-button').click();
    await expect(page.locator('#quiz-name-modal')).toBeVisible();
    await expect(page.locator('#quiz-name-input')).toHaveValue(duplicatedQuizName);
    await page.locator('#quiz-name-modal').getByRole('button', { name: 'Next' }).click();

    await expect(page.locator('#quiz-visibility-modal')).toBeVisible();
    await page.locator('#quiz-visibility-public').check();
    const duplicateResponse = page.waitForResponse(response =>
      response.url().endsWith(`/quiz/${quizId}/duplicate`)
      && response.request().method() === 'POST',
    );
    await page.locator('#quiz-visibility-modal')
      .getByRole('button', { name: 'Create new quiz' })
      .click();

    // then: the duplicated quiz keeps the original quiz's question
    const response = await duplicateResponse;
    expect(response.status()).toBe(201);
    const body = await response.json() as { quiz: { id: number } };
    duplicatedQuizId = body.quiz.id;
    await expect(page).toHaveURL(new RegExp(`/quiz/${duplicatedQuizId}$`));
    await expect(page.locator('#quiz-title')).toHaveText(duplicatedQuizName);
    await expect(page.getByText(questionName, { exact: true })).toBeVisible();
  } finally {
    await deleteQuiz(page, duplicatedQuizId);
    await deleteQuiz(page, quizId);
  }
});
