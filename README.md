# Production deployment with Docker Compose

* Copy the `.env.example` file into `.env`

  ```sh
  cp .env.example .env
  ```

* Generate passwords for different services and add them to your `.env`.
  You can use `openssl rand -hex 32` to generate them securely.

* Unless you're setting up a custom S3 bucket for the images service,
  skip the `IMAGE_` options for now.

* Run the compose file:

  ```sh
  docker compose up -d
  ```

* Once the service is running, create the actual bucket and access key:

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

* Use the "Key ID" and "Secret key" fields from the key creation step as
  `IMAGE_ACCESS_KEY` and `IMAGE_SECRET_KEY` env vars, respectively:

  ```sh
  IMAGE_ACCESS_KEY=GKa85289d7ee87ccd281789601
  IMAGE_SECRET_KEY=d345381e9b6f0e835e900592fae82ebba83cbf132553abd5fbb1f6302510ec56
  ```

* Restart the service:

  ```sh
  docker compose restart
  ```

# for deploying to production


`/home/shira should be the location`

## Steps

> you may need to run npm install before in some cases

- `git pull` usually from main

- `./deploy-frontend.sh`

- `./deploy-api.sh`

- if migrations need to be run refer to the api docs for the commands on `./apps/api`

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
