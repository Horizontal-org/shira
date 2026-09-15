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

The containers stay running between test runs. Use `npm run test:e2e:down` to stop them; the next `npm run test:e2e` starts them automatically. `npm run test:e2e:infra` is also available to start only the infrastructure.

```sh
npm run test:e2e -- --project=spaces
npm run test:e2e -- --project=api
npm run test:e2e:ui
npm run test:e2e -- --project=spaces --debug
npm run test:e2e:report
npm run test:e2e:down
```

Selecting a project filters the tests. Both frontend servers still start. Their ports must be available: existing frontend processes are not reused. Compose manages the API container and rebuilds its image when source files change.

The image copies API source from your working tree. Keep the original application ports (`3306`, `6379`, and `3000`) when building it.

## Data and isolation

- The API connects to `mysql:3306` and `redis:6379` inside the dedicated Compose network, using the application's original ports. MySQL and Redis do not publish host ports. The MySQL database and user are both `shira_e2e`.
- The API listens on port `3000` inside Docker, published as `http://localhost:13000` for Playwright and the frontend apps. Spaces uses port `13002`. Public uses port `13001`.
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

The `integration.yml` workflow sets up dependencies and containers for each PR and runs the suite.

Reference documentation: [projects](https://playwright.dev/docs/test-projects), [HTTP testing](https://playwright.dev/docs/api-testing), and [local servers](https://playwright.dev/docs/test-webserver).
