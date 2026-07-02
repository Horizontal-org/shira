# Shira

Shira is a Turborepo monorepo with a NestJS API, a public-facing quiz app, an internal spaces app, and shared packages used across the workspace.

## Workspace

- `apps/api`: NestJS backend for auth, quizzes, learners, subscriptions, email, and integrations.
- `apps/public`: Public quiz experience for learners and invite flows.
- `apps/spaces`: Internal product for managing quizzes, questions, learners, and organizations.
- `packages/shira-ui`: Shared UI components used by the frontend apps.

## Prerequisites

- Node.js and npm installed
- Docker and Docker Compose installed

## Environment

Copy the app env files before starting:

```sh
cp apps/api/.env.example apps/api/.env
cp apps/public/.env.example apps/public/.env
cp apps/spaces/.env.example apps/spaces/.env
```
See each app README for the expected variables and examples.

## Local Development

1. Install dependencies from the repo root:

```sh
npm install
```

2. Create the shared Docker network once:

```sh
docker network create shira-network
```

3. Start MySQL and Redis for the API:

```sh
docker compose -f apps/api/docker-compose.required.yml up -d
```

4. Start the workspace from the repo root:

```sh
npm run dev
```

This starts:

- API on `http://localhost:3000`
- Public app on `http://localhost:3001`
- Spaces app on `http://localhost:3002`

Run API migrations from `apps/api` after the backend is up:

```sh
cd apps/api
npm run typeorm -- migration:run -d ./src/utils/datasources/mysql.datasource.ts
```

Run Storybook from `packages/shira-ui`:

```sh
cd packages/shira-ui
npm run storybook
```

## App Docs

- [API](apps/api/README.md)
- [Public](apps/public/README.md)
- [Spaces](apps/spaces/README.md)
