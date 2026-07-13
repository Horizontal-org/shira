# Shira API

`apps/api` is the NestJS backend for authentication, quizzes, learners, subscriptions, email flows, and external integrations used by the Shira apps.

## Prerequisites

- Node.js and npm
- Docker and Docker Compose
- A shared Docker network named `shira-network`

## Environment

Copy the example file and fill in the values:

```sh
cp .env.example .env
```

## Local Development

1. Create the shared Docker network once:

```sh
docker network create shira-network
```

2. Start MySQL and Redis:

```sh
docker compose -f docker-compose.required.yml up -d
```

3. Start the API in one of these modes:

Run locally:

```sh
npm run dev
```

Run in Docker:

```sh
docker compose -f docker-compose.api.yml up dev
```

Both modes expose the API at `http://localhost:3000`.

4. Run migrations after the API dependencies are ready:

Run locally:

```sh
npm run typeorm -- migration:run -d ./src/utils/datasources/mysql.datasource.ts
```

Run in Docker:

```sh
docker exec -it shira-api-dev npm run typeorm -- migration:run -d ./src/utils/datasources/mysql.datasource.ts
```

Create a new migration:

```sh
npm run typeorm migration:create ./src/migrations/your_migration_name
```

## Deployment

Deploy from `apps/api`:

```sh
./deploy.sh
```

Or from the repo root:

```sh
npm run deploy-api
```

The deploy script builds and starts the `staging` service defined in `docker-compose.api.yml`.

## Reference

- Database ERD: `docs/img/db-sql-quiz-question-diagram.png`
- Relationships overview: `docs/img/db-quiz-question-relationship-diagram.png`
