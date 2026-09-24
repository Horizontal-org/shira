import { test, expect } from '@playwright/test';

const account = { email: 'admin@e2e.example.test', password: 'E2e-password-123!' };

test('protected user endpoint rejects an anonymous request', async ({ request }) => {
// when: request to a protected endpoint
  const response = await request.get('/user');

  // then: the API rejects the request
  expect(response.status()).toBe(401);
});

test('login validates the payload and rejects incorrect credentials', async ({ request }) => {
  // given: login attempts have an incomplete or incorrect payload
  const incompletePayload = { email: account.email };
  const incorrectCredentials = { ...account, password: 'incorrect' };

  // when: the client tries to log in with each payload
  const invalidPayloadResponse = await request.post('/login', { data: incompletePayload });
  const incorrectCredentialsResponse = await request.post('/login', { data: incorrectCredentials });

  // then: validation and authentication fail
  expect(invalidPayloadResponse.status()).toBe(400);
  expect(incorrectCredentialsResponse.status()).toBe(401);
  expect((await request.get('/user')).status()).toBe(401);
});
