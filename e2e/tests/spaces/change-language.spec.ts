import { expect, test } from '@playwright/test';
import { signInAsUser } from './helpers';

test('a user can change the space interface language', async ({ page }) => {
  // given: a signed-in user is viewing Settings in english
  await page.addInitScript(() => {
    window.localStorage.setItem('lang', 'en');
  });
  await signInAsUser(page);
  await page.goto('/settings');
  await expect(page.locator('#settings-layout')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Settings', exact: true })).toBeVisible();

  // when: the user changes language to spanish
  await page.getByText('English', { exact: true }).click();
  await page.getByText('Spanish', { exact: true }).click();

  // then: translated content and the saved language are updated
  await expect(page.getByRole('heading', { name: 'Configuración', exact: true })).toBeVisible();
  await expect(page.getByText('Gestiona la configuración de tu espacio Shira aquí.', { exact: true })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect.poll(() => page.evaluate(() => window.localStorage.getItem('lang'))).toBe('es');

  // when: the user restores language to english
  await page.getByText('Español', { exact: true }).click();
  await page.getByText('Inglés', { exact: true }).click();

  // then: language returns to english
  await expect(page.getByRole('heading', { name: 'Settings', exact: true })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect.poll(() => page.evaluate(() => window.localStorage.getItem('lang'))).toBe('en');
});
