# Integration test suite

This directory contains the end-to-end and integration test suite for Shira.

The suite uses Playwright to test the real application across three projects:

- `api`
- `spaces`
- `public`

The real Nest API runs against isolated MySQL and Redis instances. Spaces and Public run locally and connect to that API.

External services such as image storage, email, the public library, and payments are not started unless a test explicitly requires them.

## Requirements

- Node 22
- npm
- Docker
- Docker Compose

## Setup

Install project dependencies:

```sh
npm ci
```

Install the Playwright browser:

```sh
npm run test:e2e:install
```

## Running the suite

Run the complete E2E suite:

```sh
npm run test:e2e
```

This command:

- starts the dedicated MySQL and Redis containers
- builds `shira-ui`
- starts the API, Spaces, and Public apps
- applies database migrations
- seeds the E2E test data
- runs the Playwright tests

The first run may take longer because Docker images and the Playwright browser may need to be downloaded.

### Running individual projects

Example: run only API tests

```sh
npm run test:e2e -- --project=api
```

## Development and debugging

Run tests with the browser visible:

```sh
npm run test:e2e -- --project=spaces --headed
```

Open the latest HTML report:

```sh
npm run test:e2e:report
```

## Infrastructure

The E2E environment uses dedicated local ports so it does not conflict with the normal development environment.

| Service | Address |
| --- | --- |
| MySQL | `127.0.0.1:13307` |
| Redis | `127.0.0.1:16379` |
| API | `http://localhost:13000` |
| Public | `http://localhost:13001` |
| Spaces | `http://localhost:13002` |

### Container lifecycle

MySQL and Redis are managed by Docker Compose.

They remain running between test executions so repeated local runs can start faster.

To stop and remove the E2E infrastructure:

```sh
npm run test:e2e:down
```

## Test data

Before the API test server starts, the E2E setup:

- applies the database migrations
- creates the required organization
- creates a test space
- creates an administrator account

The default seeded administrator is:

```text
Email: admin@e2e.example.test
Password: E2e-password-123!
```

These credentials are only intended for the isolated E2E environment.

Tests should not depend on data created by another test.

When a test creates or modifies application state, prefer creating explicit test data and cleaning it up where appropriate.

## Directory structure

Tests are organized by Playwright project:

```text
e2e/
├── tests/
│   ├── api/
│   ├── spaces/
│   └── public/
├── playwright.config.ts
├── start-api.ts
└── README.md
```

### Browser tests

Spaces and Public tests run in headless Chromium by default.

A browser test can exercise the full application flow:

```text
browser
   ↓
React application
   ↓
Nest API
   ↓
MySQL / Redis
```

These tests should focus on important user flows rather than reproducing every component-level or unit-level test.

## Reports and artifacts

Playwright generates an HTML report under:

```text
playwright-report/
```

Failure artifacts are stored under:

```text
test-results/
```

## CI

The integration test workflow runs the suite in GitHub Actions.

CI:

- installs dependencies
- installs the Playwright browser and system dependencies
- starts the isolated MySQL and Redis containers
- starts the application servers
- runs the test suite
- uploads Playwright reports and failure artifacts

The workflow runs on pull requests and on the configured branch pushes.

If a test fails in CI, check the uploaded Playwright report and trace before trying to reproduce the failure locally.

## Cleanup

To stop the E2E Docker services:

```sh
npm run test:e2e:down
```
