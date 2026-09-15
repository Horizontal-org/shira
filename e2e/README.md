# Integration test suite

## Description

Playwright coordinates three projects: api, spaces, and public.
Spaces tests use real Nest, MySQL, and Redis instances.

## Running the suite

Requirements: Node 22, npm, and Docker Compose. Docker must be running.

```sh
npm ci
npm run test:e2e:install
npm run test:e2e
```

`pretest:e2e` starts the dedicated MySQL and Redis containers, waits for their health checks, and builds `shira-ui` so the apps do not consume an outdated `dist`. 
Playwright starts and stops all three servers, applies all migrations, and creates the test account before running the tests. The first startup may take a few minutes.

The containers stay running between test runs. Use `npm run test:e2e:down` to stop them; the next `npm run test:e2e` starts them automatically. `npm run test:e2e:infra` is also available to start only the infrastructure.

```sh
npm run test:e2e -- --project=spaces
npm run test:e2e -- --project=api
npm run test:e2e:ui
npm run test:e2e -- --project=spaces --debug
npm run test:e2e:report
npm run test:e2e:down
```

Selecting a project filters the tests. The suite's ports must be available: existing processes are not reused.

## Data and isolation

- Dedicated MySQL instance: `127.0.0.1:13307`, with database and user `shira_e2e`. Dedicated Redis instance: `127.0.0.1:16379`.
- Credentials in `environment.js` and the test files are public and intended only for this disposable local environment.
- `start-api.ts` checks the host, port, and database before running migrations or seeding data. It does not import the development datasource, which connects on import.
- The seed is transactional and idempotent: it creates an organization, a space, and an administrator. It does not delete tables. MySQL uses `tmpfs`: bringing the containers down and back up starts with an empty database.
- The suite runs with one worker. Each test gets a new browser or HTTP context; cookies are not shared. When adding tests that modify quizzes, use separate data for each test and explicit cleanup before enabling parallel execution.
- The API runs in self-hosted mode. Image, email, and external library services are not started; their test URLs point to localhost. Add local services and fixtures when covering those flows.
- Do not point this suite at staging or production. Connection settings are fixed in `environment.js` so the local `.env` cannot change their destinations.

## Adding coverage

Add specs under `tests/<project>/`; Playwright discovers them automatically.

## Troubleshooting and CI

`playwright-report/` contains the HTML report; `test-results/` stores failure traces, videos, and screenshots. Both are ignored by Git. `npx tsc -p e2e/tsconfig.json` checks test types.

The `integration.yml` workflow sets up dependencies and containers for each PR, runs the suite, and retains artifacts for seven days. It allows one retry in CI for diagnosis; local runs have no retries.

Reference documentation: [projects](https://playwright.dev/docs/test-projects), [HTTP testing](https://playwright.dev/docs/api-testing), and [local servers](https://playwright.dev/docs/test-webserver).
