import { test, expect } from '@playwright/test';

const account = { email: 'admin@e2e.example.test', password: 'E2e-password-123!' };

test('protected user endpoint rejects an anonymous request', async ({ request }) => {
  expect((await request.get('/user')).status()).toBe(401);
});

test('login validates the payload and rejects incorrect credentials', async ({ request }) => {
  expect((await request.post('/login', { data: { email: account.email } })).status()).toBe(400);
  expect((await request.post('/login', { data: { ...account, password: 'incorrect' } })).status()).toBe(401);
  expect((await request.get('/user')).status()).toBe(401);
});
