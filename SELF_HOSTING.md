# Self-hosting Shira

This guide covers deploying Shira to a production server with Docker Compose.
For development on your local machine, see the [main README](README.md#local-development).

## System requirements

Minimum system requirements:

- RAM: 2 GB
- Disk: 5 GB

Shira stores its data on the server unless you use an external S3 provider.
Monitor disk usage and add capacity as needed. The appropriate disk size depends
on how much data users submit; a useful target is to keep as much disk space free
as is currently in use.

Shira should work with any hosting provider that supports Docker. It has been
deployed successfully on DigitalOcean and Greenhost. If you experience issues,
[contact us](https://shira.app/contact).

## Prerequisites

- [Docker Engine](https://docs.docker.com/engine/install/) with the Docker
  Compose plugin installed.
- Two subdomains: one for spaces and one for quizzes. If you use the bundled
  Garage image server, you also need a third subdomain for images.
- Inbound TCP ports 80 and 443 must be open. If the server uses UFW, allow them
  with:

  ```sh
  sudo ufw allow 80,443/tcp
  ```

- Ports 80 and 443 must not be in use by another web server or process.
- Credentials for an SMTP server.

## Installation

Clone this repository onto a server with a running Docker daemon, then copy the
root environment template:

```sh
cp .env.example .env
```

Edit the root `.env` file with your production configuration. This file is
separate from the app-level environment files used for local development.

### Configure and verify DNS

Set the spaces and quizzes hostnames using the variables ending in `_DOMAIN`.
If you use the bundled Garage image server, configure `IMAGES_DOMAIN` as well.

Create the DNS records before starting Shira and verify that each hostname
resolves to the server's public IP:

```sh
dig +short spaces.example.org
dig +short quizzes.example.org
dig +short images.example.org
```

Before the first start, confirm that no existing service is listening on ports
80 or 443:

```sh
sudo ss -ltnp | grep -E ':(80|443)[[:space:]]'
```

### Configure the environment

Generate secure values for password and secret variables with:

```sh
openssl rand -hex 32
```

The bundled Garage image server is configured in two phases. On the first boot,
leave `IMAGE_ACCESS_KEY` and `IMAGE_SECRET_KEY` blank because Garage must be
running before you can create them. `IMAGE_BUCKET` can keep its default value of
`shira`; if you change it, use the same name when creating the Garage bucket.

### Start Shira

After setting the root `.env` variables, start the services:

```sh
docker compose up -d
```

Docker Compose starts the required services, and the reverse proxy requests
certificates for the configured domains. The services continue running until
you stop them with `docker compose down`.

To run a specific Shira version, change the `VERSION` variable. Otherwise, the
deployment uses the configured default image tag.

## Environment variables

Use strong passphrases for password variables. Optional variables can be left
empty or keep their default values.

| Key | Description | Notes |
| --- | --- | --- |
| COOKIE_DOMAIN | Main domain for cookies | required |
| SPACES_DOMAIN | Subdomain of `COOKIE_DOMAIN` for the Shira spaces app | required |
| QUIZ_DOMAIN | Subdomain of `COOKIE_DOMAIN` for the Shira quizzes app | required |
| IMAGES_DOMAIN | Domain for the images server | optional |
| VERSION | Container version (`alpha`, `beta`, `latest`, or any [container tag][]) | optional |
| JWT_SECRET | Secret for authorization between apps | required |
| MYSQL_PASSWORD | Password for the MySQL database | required |
| MYSQL_ROOT_PASSWORD | Root password for the MySQL service | required |
| REDIS_PASSWORD | Password for the Redis database | required |
| GARAGE_RPC_SECRET | Secret for the Garage cluster | required |
| IMAGE_ACCESS_KEY | S3 bucket access key for uploading images | required after Garage setup |
| IMAGE_SECRET_KEY | S3 bucket secret key for uploading images | required after Garage setup |
| SMTP_GLOBAL_FROM | Sender address; also receives Let's Encrypt notifications | required |
| SMTP_HOST | SMTP server hostname | required |
| SMTP_PORT | SMTP server port | required |
| SMTP_USER | SMTP username | required |
| SMTP_PASS | SMTP password | required |
| TZ | Server timezone | optional |
| MYSQL_HOST | MySQL server hostname | optional |
| MYSQL_DATABASE | MySQL database name | optional |
| MYSQL_USER | MySQL username | optional |
| REDIS_HOST | Redis server hostname | optional |
| IMAGE_ENDPOINT | Garage server hostname | optional |
| IMAGE_PORT | Garage server port | optional |
| IMAGE_BUCKET | S3 bucket name; must match the bucket created during Garage setup | required after Garage setup |
| SUBSCRIPTION_CACHE_TTL | Redis cache duration | optional |
| SPACE_URL | Full URL for the spaces app (no trailing slash) | optional |
| PUBLIC_URL | Full URL for the quizzes app (no trailing slash) | optional |
| SUPERADMIN_URL | Full URL for the super admin (no trailing slash) | optional |
| SHIRA_LIBRARY_URL | Full URL for Shira's public library (no trailing slash) | optional |
| SHIRA_LIBRARY_IMAGES_URL | Full URL for Shira's public library bucket, used for validation | optional |
| SELF_HOSTED | When `true`, disables payments | optional |
| ENABLE_PUBLIC_LIBRARY | When `true`, enables synchronization with the public library | optional |
| TRUST_DOWNSTREAM_PROXY | Set to `true` when serving Shira behind your own reverse proxy | optional |

[container tag]: https://hub.docker.com/r/horizontalorg/shira-api

## Configure the Garage image server

After the initial `docker compose up -d` starts Garage, complete the second
phase of the image server setup.

1. Create the Garage layout, bucket, and access key:

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

2. Add the `Key ID` and `Secret key` from the key creation output to the root
   `.env` file. Set `IMAGE_BUCKET` to the bucket name created above (`shira` in
   this example):

   ```sh
   IMAGE_ACCESS_KEY=GKa85289d7ee87ccd281789601
   IMAGE_SECRET_KEY=d345381e9b6f0e835e900592fae82ebba83cbf132553abd5fbb1f6302510ec56
   IMAGE_BUCKET=shira
   ```

3. Recreate the affected containers so they load the new environment variables:

   ```sh
   docker compose up -d
   ```

## Upgrades

1. Pull the latest repository changes with `git pull`.
2. Update the root `.env` file from `.env.example`.
3. Pull the latest container images with `docker compose pull`.
4. Apply the update with `docker compose up -d`.
