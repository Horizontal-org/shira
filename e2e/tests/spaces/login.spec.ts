import { test, expect } from '@playwright/test';

const account = { email: 'admin@e2e.example.test', password: 'E2e-password-123!' };
const spaceName = 'E2E Space';

test('anonymous dashboard access leads to login', async ({ page }) => {
  // when: the user opens shira web
  await page.goto('/');

  // then: the login page appears with submission disabled
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.locator('#login-button')).toBeDisabled();
});

test('incorrect password displays an error without granting access', async ({ page }) => {
  // given: the login form contains an existing email and an incorrect password
  await page.goto('/login');
  await page.locator('#email-input').fill(account.email);
  await page.locator('#password-input').fill('incorrect');
  const response = page.waitForResponse(r => r.url().endsWith('/login') && r.request().method() === 'POST');

  // when: the user submits the login form
  await page.locator('#login-button').click();

  // then: authentication fails and the user stays on the login page
  expect((await response).status()).toBe(401);
  await expect(page.locator('#login-error')).toBeVisible();
  await expect(page).toHaveURL(/\/login$/);
});

test('login opens the space, survives reload and logout removes access', async ({ page }) => {
  // given: the login form contains valid credentials
  await page.goto('/login');
  await page.locator('#email-input').fill(account.email);
  await page.locator('#password-input').fill(account.password);
  const response = page.waitForResponse(r => r.url().endsWith('/login') && r.request().method() === 'POST');

  // when: the user submits the login form
  await page.locator('#login-button').click();

  // then: authentication succeeds and the user's space is displayed
  expect((await response).status()).toBe(201);
  await expect(page.locator('#dashboard-layout')).toBeVisible();
  await expect(page.locator('#space-name')).toHaveText(spaceName);

  // when: the user reloads the page
  await page.reload();

  // then: the authenticated session and space remain available
  await expect(page.locator('#dashboard-layout')).toBeVisible();
  await expect(page.locator('#space-name')).toHaveText(spaceName);

  // when: the user logs out
  await page.goto('/logout');

  // then: the user returns to the login page
  await expect(page).toHaveURL(/\/login$/);

  // when: the user tries to open the dashboard again
  await page.goto('/');

  // then: dashboard access requires logging in again
  await expect(page).toHaveURL(/\/login$/);
});
