import { expect, type Page } from '@playwright/test';
import { E2E_URLS } from '../environment';

const account = { email: 'admin@e2e.example.test', password: 'E2e-password-123!' };

export const signInAsUser = async (page: Page) => {
  await page.goto('/login');
  await page.locator('#email-input').fill(account.email);
  await page.locator('#password-input').fill(account.password);
  await page.locator('#login-button').click();
  await expect(page.locator('#dashboard-layout')).toBeVisible();
};

export const deleteQuiz = async (page: Page, quizId: number | undefined) => {
  if (quizId === undefined) return;

  const response = await page.request.delete(`${E2E_URLS.api}/quiz/${quizId}`);
  expect(response.ok()).toBe(true);
};
