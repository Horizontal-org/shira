import { test, expect } from '@playwright/test';

test('welcome starts quiz setup', async ({ page }) => {
  // given: the welcome screen is open
  await page.goto('/');
  await expect(page.locator('#welcome-scene')).toBeVisible();

  // when: the user starts a quiz
  await page.locator('#start-quiz-button').click();

  // then: the quiz setup screen appears
  await expect(page.locator('#quiz-setup-name-scene')).toBeVisible();
});
