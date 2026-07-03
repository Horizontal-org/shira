# Shira Public

`apps/public` is the public-facing frontend for quiz flows, learner invitations, and related user journeys.

## Prerequisites

- Node.js and npm
- A running API, usually at `http://localhost:3000` during local development

## Environment

Copy the example file:

```sh
cp .env.example .env
```

## Local Development

From the repo root, install dependencies and start the workspace:

```sh
npm install
npm run dev
```

If you only want this app, run from `apps/public`:

```sh
npm run dev
```

The app runs on `http://localhost:3001`.

## Deployment

Frontend builds are triggered from the repo root with:

```sh
npm run deploy-frontend
```
