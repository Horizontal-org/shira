# for deploying to production

`/home/shira should be the location`

### Steps

> you may need to run npm install before in some cases

- `git pull` usually from main

- `./deploy-frontend.sh`

- `./deploy-api.sh`

- if migrations need to be run refer to the api docs for the commands on `./apps/api`

# for deploying locally

### Prerequisites

- Docker and Docker Compose installed
- Node.js and npm installed

### Steps

**1. Set up environment variables**

For the API:

```sh
cp apps/api/.env.example apps/api/.env
# then fill in the required values
```

For the frontend apps:

```sh
# public — no example file, create it manually.

# spaces:
cp apps/spaces/.env.example apps/spaces/.env
# then fill in REACT_APP_API_URL, REACT_APP_PUBLIC_URL, REACT_APP_LIBRARY_API_URL
```

**2. Create the shared Docker network**

This only needs to be done once:

```sh
docker network create shira-network
```

**3. Start required services (MySQL + Redis)**

```sh
docker compose -f apps/api/docker-compose.required.yml up -d
```

**4. Start the API in development mode**

```sh
docker compose -f apps/api/docker-compose.api.yml up dev
```

Starts the NestJS API with hot-reload on port `3000`. The image is built automatically on first run.

**5. Run database migrations**

Migrations must run inside the API container:

```sh
docker exec -it shira-api-dev npm run typeorm -- migration:run -d ./src/utils/datasources/mysql.datasource.ts
```

> To create a new migration: `docker exec -it shira-api-dev npm run typeorm migration:create ./src/migrations/your_migration_name`

**6. Start the frontend apps**

From the repo root:

```sh
npm install
npm run dev
```

Turborepo starts all frontend apps in parallel:
- `public` on port `3001`
- `spaces` on port `3002`

---

# Turborepo starter with shell commands

This Turborepo starter is maintained by the Turborepo core team. This template is great for issue reproductions and exploring building task graphs without frameworks.

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-shell-commands
```

### For bug reproductions

Giving the Turborepo core team a minimal reproduction is the best way to create a tight feedback loop for a bug you'd like to report.

Because most monorepos will rely on more tooling than Turborepo (frameworks, linters, formatters, etc.), it's often useful for us to have a reproduction that strips away all of this other tooling so we can focus _only_ on Turborepo's role in your repo. This example does exactly that, giving you a good starting point for creating a reproduction.

- Feel free to rename/delete packages for your reproduction so that you can be confident it most closely matches your use case.
- If you need to use a different package manager to produce your bug, run `npx @turbo/workspaces convert` to switch package managers.
- It's possible that your bug really **does** have to do with the interaction of Turborepo and other tooling within your repository. If you find that your bug does not reproduce in this minimal example and you're confident Turborepo is still at fault, feel free to bring that other tooling into your reproduction.

## What's inside?

This Turborepo includes the following packages:

### Apps and Packages

- `app-a`: A final package that depends on all other packages in the graph and has no dependents. This could resemble an application in your monorepo that consumes everything in your monorepo through its topological tree.
- `app-b`: Another final package with many dependencies. No dependents, lots of dependencies.
- `pkg-a`: A package that has all scripts in the root `package.json`.
- `pkg-b`: A package with _almost_ all scripts in the root `package.json`.
- `tooling-config`: A package to simulate a common configuration used for all of your repository. This could resemble a configuration for tools like TypeScript or ESLint that are installed into all of your packages.

### Some scripts to try

If you haven't yet, [install global `turbo`](https://turbo.build/repo/docs/installing#install-globally) to run tasks.

- `turbo build lint typecheck`: Runs all tasks in the default graph.
- `turbo build`: A basic command to build `app-a` and `app-b` in parallel.
- `turbo build --filter=app-a`: Building only `app-a` and its dependencies.
- `turbo lint`: A basic command for running lints in all packages in parallel.
