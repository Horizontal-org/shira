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

Set `ENABLE_PUBLIC_LIBRARY=false` in `apps/api/.env` to disable the public quiz library on self-hosted instances that don't want to depend on the public library service.

To generate passwords for different services and add them to your `.env`, you can use `openssl rand -hex 32` to generate them securely.

## Releases

After new commits arrive at `main`, we can tag a new release:

```sh
git switch main
git pull
# Update version number on package.json and .env.example
$EDITOR .env.example package.json
# Commit the version
git add .env.example package.json
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

## Production deployment

### System requirements

_Minimum_ system requirements:

- RAM: 2GB
- DISK: 5GB
  > For disk space, the data stored in Shira is in the same server
  > unless you use an external S3 provider, so consider monitoring
  > server storage and adding space if needed. _If you are running Shira
  > on a server with less resources than our recommended set up, we
  > would love to hear about your experience :D_

_Recommended_ system requirements: Ideal disk space depends on how much
data you intend to collect. A good role of thumb would be to allocate
the double of the space that users would submit to your server. When
monitoring, we recommend for you to aim to have the same amount of free
and used space in the server.

We don't have any particular recomendation about hosting providers for
Shira: this is a pretty straightforward application so it should work
anywhere you can install Docker. If you experience any issues please
[contact us](https://shira.app/contact).

### Prerequisites

- Docker (including the compose module).

- Two subdomains, one for spaces and one for quizes. The domains should
  point to the desired server.  If you're using the included S3 server,
  you'll need a third subdomain.

- Credentials for an SMTP server.

### Installation

You'll need a server with a running Docker daemon, Docker Compose, and
a clone of this repository.

Copy the `.env.example` into `.env` and edit accordingly.

Two domain names must point to this server.  One is for spaces, and
another for quizes.  Edit these on the variables ending with `_DOMAIN`.

To generate passwords for different services, you can use `openssl rand
-hex 32` to generate them securely.

Unless you're setting up a custom S3 bucket for the images service, skip
the `IMAGE_` options for now.

After setting the `.env` variables, run `docker compose up -d`.  The
compose will run every service needed, issue certificates for the
configured domains, and keep running until you stop them with `docker
compose down`.

If you want to upgrade a running service, run `docker compose pull` to
pull the `latest` images.  If you want to run a specific Shira version,
change the `VERSION` variable.

#### Environment variables table

**For passwords variables, please remember to create strong
passphrases.**

**Optional variables can be empty or keep the default values.**


| Key                      | Description                                                                 | Notes    |
| ------------------------ | --------------------------------------------------------------------------- | -------- |
| COOKIE_DOMAIN            | Main domain for cookies                                                     | required |
| SPACES_DOMAIN            | Subdomain of COOKIE_DOMAIN for the Shira spaces app                         | required |
| QUIZ_DOMAIN              | Subdomain of COOKIE_DOMAIN for the Shira quizes app                         | required |
| IMAGES_DOMAIN            | Domain for the images server                                                | optional |
| VERSION                  | Containers version                                                          | optional |
| JWT_SECRET               | Secret for authorization between apps                                       | required |
| MYSQL_PASSWORD           | Password for the MySQL database                                             | required |
| MYSQL_ROOT_PASSWORD      | Root password for MySQL service                                             | required |
| REDIS_PASSWORD           | Password for Redis database                                                 | required |
| GARAGE_RPC_SECRET        | Secret for Garage cluster                                                   | required |
| IMAGE_ACCESS_KEY         | S3 bucket access key for uploading images                                   | required |
| IMAGE_SECRET_KEY         | S3 bucket secret key for uploading images                                   | required |
| SMTP_GLOBAL_FROM         | Send emails from this address, it also receives Let's Encrypt notifications | required |
| SMTP_HOST                | SMTP server hostname                                                        | required |
| SMTP_PORT                | SMTP port                                                                   | required |
| SMTP_USER                | SMTP user name                                                              | required |
| SMTP_PASS                | SMTP password                                                               | required |
| TZ                       | Server timezone                                                             | optional |
| MYSQL_HOST               | MySQL server hostname                                                       | optional |
| MYSQL_DATABASE           | MySQL database                                                              | optional |
| MYSQL_USER               | MySQL username                                                              | optional |
| REDIS_HOST               | Redis server hostname                                                       | optional |
| IMAGE_ENDPOINT           | Garage server hostname                                                      | optional |
| IMAGE_PORT               | Garage server port                                                          | optional |
| IMAGE_BUCKET             | S3 bucket                                                                   | required |
| SUBSCRIPTION_CACHE_TTL   | Redis cache duration                                                        | optional |
| SPACE_URL                | Full URL for the spaces app (no trailing slash)                             | optional |
| PUBLIC_URL               | Full URL for the quizes app (no trailing slash)                             | optional |
| SUPERADMIN_URL           | Full URL for the super admin (no trailing slash)                            | optional |
| SHIRA_LIBRARY_URL        | Full URL for Shira's public library (no trailing slash)                     | optional |
| SELF_HOSTED              | When "true" disables payments                                               | optional |
| ENABLE_PUBLIC_LIBRARY    | When "true" enables synchronization with the public library                 | optional |
| TRUST_DOWNSTREAM_PROXY   | Change to "true" if you're serving Shira behind your own reverse proxy      | optional |

### Upgrades

1. `git pull` from this repository
2. Update your `.env` file from `.env.example`
3. Run `docker compose up -d`

### Image server (Garage)

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
