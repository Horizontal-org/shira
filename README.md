<p align="center">
  <img src="apps/public/public/logo192.png" alt="Shira logo" width="120" />
</p>

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

To generate passwords for different services and add them to your `.env`, you can use `openssl rand -hex 32` to generate them securely.

### Image server (Garage)

Unless you're setting up a custom S3 bucket for the images service, skip the `IMAGE_` options for now.

* Run the compose file:

  ```sh
  docker compose up -d
  ```

* Once the service is running, create the actual Garage bucket and access key:

  ```sh
  id=`docker exec shira-images-1 /garage node id -q`
  # Change 1G to your actual storage capacity
  docker exec shira-images-1 /garage layout assign -z images -c 1G $id
  docker exec shira-images-1 /garage layout apply --version 1
  # Keep the output of this command somewhere safe
  docker exec shira-images-1 /garage key create shira
  docker exec shira-images-1 /garage bucket create shira
  docker exec shira-images-1 /garage bucket allow --read --write --owner --key shira shira
  ```

* Use the "Key ID" and "Secret key" fields from the key creation step as `IMAGE_ACCESS_KEY` and `IMAGE_SECRET_KEY` env vars, respectively:

  ```sh
  IMAGE_ACCESS_KEY=GKa85289d7ee87ccd281789601
  IMAGE_SECRET_KEY=d345381e9b6f0e835e900592fae82ebba83cbf132553abd5fbb1f6302510ec56
  ```

* Restart the service:

  ```sh
  docker compose restart
  ```

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
