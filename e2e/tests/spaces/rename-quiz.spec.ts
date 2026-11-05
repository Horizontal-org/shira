import { expect, test } from '@playwright/test';
import { E2E_URLS } from '../environment';
import { deleteQuiz, signInAsUser } from './helpers';

test('a user can rename a quiz', async ({ page }) => {
  const quizName = `E2E rename quiz ${Date.now()}`;
  const renamedQuizName = `${quizName} renamed`;
  let quizId: number | undefined;

  // given: a user is signed in and has a quiz
  await signInAsUser(page);

  try {
    const createResponse = await page.request.post(`${E2E_URLS.api}/quiz`, {
      data: { title: quizName, visibility: 'public' },
    });
    expect(createResponse.status()).toBe(201);
    ({ quizId } = await createResponse.json() as { quizId: number });
    await page.goto(`/quiz/${quizId}`);
    await expect(page.locator('#quiz-title')).toHaveText(quizName);

    // when: the user changes and saves the quiz name
    await page.locator('#more-quiz-options-button').click();
    await page.getByRole('button', { name: 'Rename' }).click();
    await expect(page.locator('#rename-quiz-modal')).toBeVisible();
    await page.locator('#rename-quiz-input').fill(renamedQuizName);
    const renameResponse = page.waitForResponse(response =>
      response.url().endsWith(`/quiz/${quizId}`) && response.request().method() === 'PUT',
    );
    await page.locator('#rename-quiz-modal').getByRole('button', { name: 'Save' }).click();

    // then: the API and quiz page reflect the new name
    expect((await renameResponse).ok()).toBe(true);
    await expect(page.locator('#rename-quiz-modal')).not.toBeVisible();
    await expect(page.locator('#quiz-title')).toHaveText(renamedQuizName);
  } finally {
    await deleteQuiz(page, quizId);
  }
});
