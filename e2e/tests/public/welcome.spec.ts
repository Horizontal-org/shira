import { test, expect } from '@playwright/test';

test('welcome starts quiz setup', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#welcome-scene')).toBeVisible();
  await page.locator('#start-quiz-button').click();
  await expect(page.locator('#quiz-setup-name-scene')).toBeVisible();
});
