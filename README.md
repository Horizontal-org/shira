<p align="center">
  <img src="apps/public/public/logo192.png" alt="Shira logo" width="120" />
</p>

# Shira

Shira is a Turborepo monorepo with a NestJS API, a public-facing quiz app, an internal spaces app, and shared packages used across the workspace.

Looking to deploy Shira? See the [self-hosting guide](SELF_HOSTING.md).

## Workspace

- `apps/api`: NestJS backend for auth, quizzes, learners, subscriptions, email, and integrations.
- `apps/public`: Public quiz experience for learners and invite flows.
- `apps/spaces`: Internal product for managing quizzes, questions, learners, and organizations.
- `packages/shira-ui`: Shared UI components used by the frontend apps.

## Prerequisites

- Node.js and npm installed
- Docker and Docker Compose installed

## Local development environment

Copy the app env files before starting:

```sh
cp apps/api/.env.example apps/api/.env
cp apps/public/.env.example apps/public/.env
cp apps/spaces/.env.example apps/spaces/.env
```

Set `ENABLE_PUBLIC_LIBRARY=false` in `apps/api/.env` to disable the public quiz library on self-hosted instances that don't want to depend on the public library service.

To generate passwords for local services and add them to the relevant app-level
`.env` file, use `openssl rand -hex 32`.

## Releases

When starting development on a new Shira version, update the root `package.json` version field (for example, `2.X.Y`).

Once the related commits have been merged into `main`, create and tag the new release:

```sh
git switch main
git pull
# Update version number in the root .env.example
$EDITOR .env.example
# Commit the version
git add .env.example
git commit -m 2.X.Y
# Follow semver.org
git tag 2.X.Y
git push
git push --tags
```

This will start the auto build on
<https://hub.docker.com/u/horizontalorg> and publish the new images.
After this process is done, you can [create a release on
Github](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes).

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

Don't forget to build from root if you made changes in the shira-ui package:

```sh
npm run build
```

5. You can also run Storybook from `packages/shira-ui`:

```sh
cd packages/shira-ui
npm run storybook
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

## App Docs

- [API](apps/api/README.md)
- [Public](apps/public/README.md)
- [Spaces](apps/spaces/README.md)
